import BrandingPanel from "../../pages/Login/components/BrandingPanel";
import WaveBackground from "../../components/ui/WaveBackground";
import ProfileCard from "./ProfileCard/ProfileCard";

function ProfilePage() {
    return (
        <div className="relative min-h-screen overflow-hidden bg-slate-50">

            <WaveBackground />

            <div className="relative z-10">

                <div className="mx-auto flex min-h-screen max-w-7xl items-center justify-center px-8 lg:flex-row">

                    <div className="flex w-full justify-center lg:flex-1">
                        <ProfileCard />
                    </div>

                    <div className="hidden flex-1 justify-center lg:flex">
                        <BrandingPanel />
                    </div>

                </div>

            </div>

        </div>
    );
}

export default ProfilePage;