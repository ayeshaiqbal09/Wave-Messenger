import Logo from "../../../../components/ui/Logo";
import { useEffect, useState } from "react";
import { Lock,
    Zap,
    Users,
    Image,
    Star } from "lucide-react";
    
const features = [
    {
        icon: Lock,
        text: "End-to-End Encryption"
    },
    {
        icon: Zap,
        text: "Real-Time Messaging"
    },
    {
        icon: Users,
        text: "Group Conversations"
    },
    {
        icon: Image,
        text: "Image Sharing"
    },
    {
        icon: Star,
        text: "Favorite Contacts"
    }
];
const technologies = [
    ".NET",
    "React",
    "SignalR",
    "PostgreSQL",
    "Redis"
];
function BrandingPanel() {
    const [currentFeature, setCurrentFeature] = useState(0);
    const [visible, setVisible] = useState(true);
   const [techVisible, setTechVisible] = useState(true);
    const [techIndex, setTechIndex] = useState(0);
    // Feature rotation effect
    useEffect(() => {

    const timer = setInterval(() => {
        setVisible(false);
    setTimeout(() => {

            setCurrentFeature(previous =>
                (previous + 1) % features.length
            );

            setVisible(true);

        }, 300);
       
    }, 3000);
     return () => {

        clearInterval(timer);

        };
    }, []);

    //teckStack pills effect
    useEffect(() => {
    const interval = setInterval(() => {
        setTechVisible(false);
        setTimeout(() => {
            setTechIndex((prev) => (prev + 1) % technologies.length);
            setTechVisible(true);
        }, 400);
         
    }, 3500);

    return () => clearInterval(interval);
}, []);
    
    

   
    const FeatureIcon = features[currentFeature].icon;
    return (
        <div className="flex flex-col justify-center max-w-lg">

            <Logo showTagline />

            <p className="mt-6 text-lg text-slate-600">
                Built for fast, secure and modern communication.
            </p>

            <div
                className={`
                    mt-10
                    flex
                    items-center
                    gap-3
                    transition-all
                    duration-300
                    ${
                        visible
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 -translate-y-2"
                    }
                `}
            >
                <FeatureIcon
                    size={24}
                    className="text-blue-600"
                />

                <span className="text-lg font-medium text-slate-800">
                     {features[currentFeature].text}
                </span>

            </div>

            <div className="mt-12">

                <p className="text-sm uppercase tracking-widest text-slate-500 mb-4">

                    Powered By

                </p>

                <div className="flex flex-wrap gap-3">
                    {technologies.map((tech, index) => (
                        <span
                            key={tech}
                            className={`rounded-full
                            px-4
                            py-2
                            hover:scale-105
                            hover:shadow-md
                            transition-all
                            duration-700 ${
                                index === techIndex
                                    ? "bg-gradient-to-r from-blue-600 to-cyan-400 text-white shadow-blue-300 shadow-lg scale-105"
                                    : "bg-blue-100 text-blue-700"
                            }
                            ${
                                techVisible
                                    ? "opacity-100"
                                    : "opacity-40"
                            }`}
                        >
                            {tech}
                        </span>
                    ))}

                    
                </div>

            </div>

        </div>
    );
}

export default BrandingPanel;