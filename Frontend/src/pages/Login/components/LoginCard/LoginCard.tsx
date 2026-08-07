import { useState } from "react";
import Logo from "../../../../components/ui/Logo";
import Card from "../../../../components/ui/Card/Card";
import Input from "../../../../components/ui/Input";
import Button from "../../../../components/ui/Button";
import { ShieldCheck } from "lucide-react";
import { login as loginUser } from "../../../../services/authService";
import axios from "axios";
import { useAuth } from "../../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function LoginCard() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();
    async function handleLogin() {
        if(!email)
        {
            setError("Please enter your email");
            return;
        }
        if(!password)
        {
            setError("Please enter your password");
            return;
        }
        setError("");
        setLoading(true);
        

        try {
            const response = await loginUser({
                email,
                password
            });
            

            login(response.token);
            
            if (!response.hasCompletedProfile) {
                navigate("/complete-profile");
            }
            else {
                navigate("/chat");
            }
            console.log("Navigating to chat...");
            

            console.log(response);
            
            setLoading(false);
        }
        catch (error) {

            if (axios.isAxiosError(error)) {

                console.log(error.response);
                console.log(error.response?.data);

                setError(error.response?.data?.message ?? "Login failed.");

            } else {

                setError("Something went wrong.");

            }

            setLoading(false);
        }
            
        
    
    }
    return (
        <div className="animate-[fadeIn_0.7s_ease] w-full px-6 sm:px-0">
            <Card className="mx-auto w-full max-w-sm">
                <div className="lg:hidden">
                    <Logo showTagline />
                </div>
                <div className="hidden lg:block">
                    <div className="mb-5 flex items-center gap-2">
                <ShieldCheck size={32} className="text-blue-600" />
                <span className="text-xs font-semibold uppercase tracking-wider text-blue-600">
                    Secure Login
                </span>
                </div>
        </div>
        <h2 className="mt-8 text-2xl font-bold text-slate-600">
            Welcome Back
        </h2>
        <p className="mt-2 text-slate-500">
        Sign in to continue to your account.
        </p>

    <div className="mt-10 w-full">

                <Input
                    label="Email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={setEmail}
                />

                <Input
                    label="Password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={setPassword}
                />
                {/* Remember Me Row */}
        <div className="my-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

                <label className=" flex items-center gap-2 text-sm text-slate-600">

                    <input
                        type="checkbox"
                        className="h-4 w-4  rounded border-slate-300 text-blue-600"
                    />

                    Remember me

                </label>

                <button
                    className=" text-sm text-blue-600 hover:text-blue-700"
                >
                    Forgot password?
                </button>

            </div>
                {/* Login Button */}
                <Button
                    text={loading ? "Logging in..." : "Login"}
                    onClick={handleLogin}
                    type="submit"
                    disabled={loading}
                    loading={loading}
                />
                {/* Error */}
                {error && (
                    <div className="mt-4 rounded-lg bg-red-50 border border-red-200 p-3">
                    <p className="text-sm text-red-700">
                        {error}
                    </p>
                     </div>
                )}
                {/* Divider */}
                <div className="my-8 flex items-center">

                <div className="h-px flex-1 bg-slate-200"></div>

                <span className="px-4 text-sm text-slate-400">
                    OR
                </span>

                <div className="h-px flex-1 bg-slate-200"></div>

            </div>
       

        </div>
        
{/* Register */}

  <div className="mt-6 flex flex-col items-center gap-1 text-sm text-slate-500 sm:flex-row sm:justify-center sm:gap-2">

                Don't have an account?

                <Link
                    to="/register"
                    className="font-semibold text-blue-600 hover:text-blue-700"
                >
                    Create Account
                </Link>

            </div>

</Card>
</div>
    );
}

export default LoginCard;