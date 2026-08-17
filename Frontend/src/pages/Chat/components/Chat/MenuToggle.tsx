import { useEffect, useRef, useState } from "react";
import { MoreVertical } from "lucide-react";
type MenuProps=
{
    onBlock: () => void;
};
function MenuToggle({
   
    onBlock
}: MenuProps)
{
    const menuRef = useRef<HTMLDivElement>(null);
    const [menuOpen, setMenuOpen] = useState(false);
    useEffect(() => {

    function handleClickOutside(event: MouseEvent) {

        if (
            menuRef.current &&
            !menuRef.current.contains(event.target as Node)
        ) {
            setMenuOpen(false);
        }

    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
        document.removeEventListener(
            "mousedown",
            handleClickOutside
        );
    };

}, []);
    return(
        <div
    ref={menuRef}
    className="relative"
>

    <button
        onClick={() => setMenuOpen(prev => !prev)}
        className="
            rounded-xl
            p-2
            text-slate-600
            transition
            hover:bg-slate-100
            active:scale-95
        "
        aria-label="Chat options"
    >
        <MoreVertical className="h-5 w-5" />
    </button>

    {menuOpen && (
        <div className="
            absolute
            right-0
            top-12
            z-50
            w-44
            rounded-xl
            border
            border-slate-200
            bg-white
            p-1
            shadow-xl
        ">

            <button
                className="
                    w-full
                    rounded-lg
                    px-3
                    py-2
                    text-left
                    text-sm
                    text-slate-700
                    transition
                    hover:bg-slate-100
                "
            >
                View Profile
            </button>

            <button
                onClick={() => {
                    setMenuOpen(false);
                    onBlock();
                }}
                className="
                    w-full
                    rounded-lg
                    px-3
                    py-2
                    text-left
                    text-sm
                    text-red-600
                    transition
                    hover:bg-red-50
                "
            >
                Block User
            </button>

        </div>
    )}

</div>
    )
}

export default MenuToggle;