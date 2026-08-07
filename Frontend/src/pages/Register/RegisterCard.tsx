import { useState } from "react";
import Logo from "../../components/ui/Logo";
import Card from "../../components/ui/Card/Card";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";
import { register } from "../../services/authService";
import { useNavigate } from "react-router-dom";

function RegisterCard() {
    const [email, setEmail] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    
    async function handleRegister() {
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
        if (password.length < 8) {
            setError("Password must be at least 8 characters.");
            return;
        }
        if(password !== confirmPassword)
        {
            setError("Passwords do not match");
            return;
        }
        if (!displayName) {
            setError("Please enter your display name");
            return;
        }

        if (!userName) {
            setError("Please enter your username");
            return;
        }
        setError("");
        setLoading(true);
        

        try {
            const response = await register({
                email,
                password,
                displayName,
                userName
            });
           
            
            console.log(response);
            navigate("/login", {
                state: {
                    message: "Account created successfully!"
                }
            });
            
            setLoading(false);
        }
        catch (error) {

            if (axios.isAxiosError(error)) {

                console.log(error.response);
                console.log(error.response?.data);

                setError(error.response?.data?.message ?? "Registration failed.");

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
                    Secure Signup
                </span>
                </div>
        </div>
        <h2 className="mt-8 text-2xl font-bold text-slate-600">
            Create Account
        </h2>
        <p className="mt-2 text-slate-500">
        Create your Wave Messenger account.
        </p>

    <div className="mt-10 w-full">

                <Input
                    label="Display Name"
                    type="text"
                    placeholder="Enter your display name"
                    value={displayName}
                    onChange={setDisplayName}
                />

                <Input
                    label="User Name"
                    type="text"
                    placeholder="Enter your user name"
                    value={userName}
                    onChange={setUserName}
                />

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

                <Input
                    label="Confirm Password"
                    type="password"
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={setConfirmPassword}
                />
                
        
                {/* Register Button */}
                <Button
                    text={loading ? "Creating account..." : "Create Account"}
                    onClick={handleRegister}
                    type="submit"
                    disabled={loading ? true : false}
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
        
{/* login */}

  <div className="mt-6 flex flex-col items-center gap-1 text-sm text-slate-500 sm:flex-row sm:justify-center sm:gap-2">

                Already have an account?

                <Link
                    to="/login"
                    className="font-semibold text-blue-600 hover:text-blue-700"
                >
                    Sign In
                </Link>

            </div>

</Card>
</div>
    );
}

export default RegisterCard;