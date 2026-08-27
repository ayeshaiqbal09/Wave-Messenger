import type { Contact } from "../../../../types/user";
import Avatar from "../../../../components/ui/Avatar";
import { ArrowLeft } from "lucide-react";
import MenuToggle from "./MenuToggle";

type ChatHeaderProps = {
    contact: Contact;
    onBlock: () => void;
    onBack: () => void;
};
function ChatHeader({
    contact,
    onBlock,
    onBack
}: ChatHeaderProps) {
    
    return (
        
        <div className="flex items-center shrink-0 justify-between border-b border-slate-200 bg-white px-6 py-4">

            <div className="flex min-w-0 items-center gap-2">
                <button
                    onClick={onBack}
                    className="
                        rounded-xl
                        p-2
                        text-slate-600
                        transition
                        hover:bg-slate-100
                        active:scale-95
                        md:hidden
                    "
                    aria-label="Back to contacts"
                >
                    <ArrowLeft className="h-5 w-5" />
                </button>
                <Avatar
                    name={contact.displayName}
                    size="md"
                />

                <div>
                    <h2 className="font-semibold text-slate-800">
                        {contact.displayName}
                    </h2>

                    <p className="text-sm text-slate-500">
                        {contact.isOnline
                            ? "Online"
                            : contact.status}
                    </p>
                </div>

            </div>

            <MenuToggle onBlock={onBlock}/>

        </div>
    );
}

export default ChatHeader;