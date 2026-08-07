import BrandingPanel from "../../pages/Login/components/BrandingPanel";
import WaveBackground from "../../components/ui/WaveBackground";
import ProfileCard from "../Profile/ProfileCard";

function CompleteProfilePage() {

    return (

        <div className="relative min-h-screen overflow-hidden bg-slate-50">

            <WaveBackground />

            <div className="relative z-10">

                <div className="mx-auto flex min-h-screen max-w-7xl items-center justify-center px-8 lg:flex-row">

                    <div className="flex w-full justify-center lg:flex-1">

                        <ProfileCard onboarding />

                    </div>

                    <div className="hidden lg:flex flex-1 justify-center">

                        <BrandingPanel />

                    </div>

                </div>

            </div>

        </div>

    );

}

export default CompleteProfilePage;