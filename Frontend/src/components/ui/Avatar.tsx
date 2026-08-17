
type AvatarProps = {
    name: string;
    size?: "sm" | "md" | "lg";
};

function Avatar({
    name,
    size = "md"
}: AvatarProps) {
    const words=name.split(" ");
    const initials =
    words.length > 1
        ? (words[0].charAt(0) + words[1].charAt(0)).toUpperCase()
        : words[0].charAt(0).toUpperCase();    
    const sizeClasses =
    size === "sm"
        ? "h-8 w-8 text-sm"
        : size === "md"
        ? "h-10 w-10 text-base"
        : "h-14 w-14 text-lg";
    return(
        <div
            className={`${sizeClasses}
                rounded-full
                bg-blue-600
                text-white
                font-semibold
                flex
                items-center
                justify-center
                shadow-sm
                select-none
                transition-all
                duration-200`}
        >
            {initials}
        </div>
    );
}

export default Avatar;