import BrandingPanel from "../../pages/Login/components/BrandingPanel";
import WaveBackground from "../../components/ui/WaveBackground";
import RegisterCard from "./RegisterCard";

function RegisterPage() {
    return (
        <div className="relative min-h-screen overflow-hidden bg-slate-50">

            <WaveBackground />
            
             <div className="relative z-10">

            <div className="mx-auto flex min-h-screen max-w-7xl lg:flex-row items-center justify-center px-8">

                {/* Left Side */}
                <div className="flex w-full justify-center lg:flex-1">
                    <RegisterCard />
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

export default RegisterPage;