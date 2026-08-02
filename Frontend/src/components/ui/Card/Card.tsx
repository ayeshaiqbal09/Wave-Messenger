

type CardProps = {

    children: React.ReactNode;
    className?: string;
};
function Card({ children, className = "" }: CardProps) {
    return (
        <div
            className={`rounded-3xl bg-white/15 backdrop-blur-xl shadow-xl hover:shadow-2xl
transition-shadow
duration-500 p-6 sm:p-8 lg:p-10 ${className}`}
        >
            {children}
        </div>
    );
}
export default Card;