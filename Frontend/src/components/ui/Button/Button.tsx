

type ButtonProps = {
    text: string;
    onClick: () => void;
    type?: "button" | "submit";
    disabled?: boolean;
    loading?: boolean;
    variant?: "primary" | "secondary";
};
function Button({
    text,
    onClick,
    type = "button",
    disabled = false,
    loading = false,
    variant = "primary"
}: ButtonProps) {
    return (
        <button type={type}
            onClick={onClick}
            disabled={disabled}
            
        className={`w-full rounded-xl py-3 font-semibold transition-all duration-300
hover:scale-[1.02] active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed
${
    variant === "primary"
        ? "bg-gradient-to-r from-blue-600 to-sky-500 text-white hover:shadow-xl"
        : "border border-slate-300 bg-white text-slate-700 hover:bg-slate-100"
}`}>
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