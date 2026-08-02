import { MessageCircleMore } from "lucide-react";

type LogoProps = {
    showTagline?: boolean;
};

function Logo({ showTagline = false }: LogoProps) {

    return (

        <div className="flex items-center gap-2 sm:gap-3">
            <MessageCircleMore
                className="h-8 w-8 text-blue-600 sm:h-12 sm:w-12"
            />

            <div>
                <h1 className="text-2xl sm:text-4xl font-bold text-slate-900 whitespace-nowrap">
                    Wave Messenger
                </h1>

                {showTagline && (
                    <p className="mt-1 text-sm sm:text-base text-slate-500">
                        Where conversations flow.
                    </p>
                )}
            </div>
    </div>

        

    );
}

export default Logo;