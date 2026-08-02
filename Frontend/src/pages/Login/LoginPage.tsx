import LoginCard from "./components/LoginCard";
import BrandingPanel from "./components/BrandingPanel";
import WaveBackground from "../../components/ui/WaveBackground";

function LoginPage() {
    return (
        <div className="relative min-h-screen overflow-hidden bg-slate-50">

            <WaveBackground />
            
             <div className="relative z-10">

            <div className="mx-auto flex min-h-screen max-w-7xl lg:flex-row items-center justify-center px-8">

                {/* Left Side */}
                <div className="flex w-full justify-center lg:flex-1">
                    <LoginCard />
                </div>

                {/* Right Side */}
                <div className="hidden lg:flex flex-1 justify-center">
                    <BrandingPanel />
                </div>

            </div>
            </div>
        </div>
    );
}

export default LoginPage;