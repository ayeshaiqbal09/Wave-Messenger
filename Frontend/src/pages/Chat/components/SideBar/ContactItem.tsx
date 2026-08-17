import Avatar from "../../../../components/ui/Avatar";
import type { Contact } from "../../../../types/user";
import type { Conversation } from "../../../../types/conversation";
import type { Message } from "../../../../types/message";
type ContactItemProps = {
    contact: Contact;
    conversation?: Conversation;
    selected?: boolean;
    onClick?: () => void;
    lastMessage?: Message;
     unreadCount: number;
};

function ContactItem({
    contact,
    conversation,
    selected = false,
    onClick,
    lastMessage,
    unreadCount
}: ContactItemProps) {

    return (
        <div
            onClick={onClick}
            className={`
                flex
                items-center
                gap-3
                rounded-2xl
                p-3
                cursor-pointer
                transition-all
                duration-200
                ${selected
                    ? "bg-blue-50 border-l-4 border-blue-600"
                    : "hover:bg-slate-50 hover:shadow-sm"
                }
            `}
        >

            <Avatar
                name={contact.displayName}
                size="md"
            />

           <div className="min-w-0 flex-1">

    <div className="flex items-center justify-between gap-2">

        <p className={`
            truncate
            font-semibold
            ${
                unreadCount > 0
                    ? "text-slate-900"
                    : "text-slate-700"
            }
        `}>
            {contact.displayName}
        </p>

        {conversation && (
            <span className="shrink-0 text-xs text-slate-400">
                {lastMessage &&
                new Date(lastMessage.sentAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit"
                })
            }
            </span>
        )}

    </div>

    <div className="flex items-center justify-between gap-2">

        <p className={`
            truncate
            text-sm
            ${
                unreadCount > 0
                    ? "font-medium text-slate-700"
                    : "text-slate-500"
            }
        `}>
            {lastMessage?.text ?? contact.status}
        </p>

        {unreadCount > 0 && (
            <span className="
                flex
                h-5
                min-w-5
                shrink-0
                items-center
                justify-center
                rounded-full
                bg-blue-600
                px-1.5
                text-xs
                font-semibold
                text-white
            ">
                {unreadCount}
            </span>
        )}

    </div>

</div>
            {contact.online && (
                <span className="h-2.5 w-2.5 rounded-full bg-green-500" />
            )}

        </div>
    );
}

export default ContactItem;