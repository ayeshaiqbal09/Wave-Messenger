import { Menu, MessageCircle } from "lucide-react";

function SidebarHeader() {
    return (
        <div className="flex items-center justify-between border-b border-slate-200 p-5">

            {/* Left Side */}
            <div className="flex items-center gap-3">

                <div className="rounded-xl bg-blue-50 p-2">
    <MessageCircle className="h-7 w-7 text-blue-600" />
</div>

                <h1 className="text-xl font-bold text-slate-800">
                    Wave Messenger
                </h1>

            </div>

            {/* Right Side */}
            <button
                className="
                rounded-xl
                p-2
                transition
                hover:bg-slate-100
                active:scale-95
                "            >
                <Menu className="h-6 w-6 text-slate-700" />
            </button>

        </div>
    );
}

export default SidebarHeader;