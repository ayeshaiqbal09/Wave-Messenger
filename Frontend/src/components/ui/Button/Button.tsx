

type ButtonProps = {
    text: string;
    onClick: () => void;
    type?: "button" | "submit";
    disabled?: boolean;
    loading?: boolean;
};
function Button({
    text,
    onClick,
    type = "button",
    disabled = false,
    loading = false
}: ButtonProps) {
    return (
        <button type={type}
            onClick={onClick}
            disabled={disabled}
            
        className="w-full
rounded-xl
bg-gradient-to-r
from-blue-600
to-sky-500
py-3
font-semibold
text-white
transition-all
duration-300
hover:scale-[1.02]
hover:shadow-xl
active:scale-95
disabled:opacity-60
disabled:cursor-not-allowed">
            <div className="flex items-center justify-center gap-2">

                {loading && (
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                )}

                <span>{text}</span>

            </div>
        </button>
        
    );
}

export default Button;