import { X } from "lucide-react";
import Avatar from "./Avatar";
import type { Contact } from "../../types/user";
import { useState } from "react";

type MessageNotificationProps = {
    contact: Contact;
    message: string;
    onClose: () => void;
    onClick: () => void;
};

function MessageNotification({
    contact,
    message,
    onClose,
    onClick
}: MessageNotificationProps) {
    const [closing, setClosing] = useState(false);
    function handleClose() {
    setClosing(true);

    setTimeout(() => {
        onClose();
    }, 250);
}

    return (
        <div
            className={`
                w-full
                ${closing
                    ? "animate-notification-out"
                    : "animate-notification-in"
                }
            `}
        >

            <div
                className="
                    flex
                    items-center
                    gap-3
                    rounded-2xl
                    border
                    border-slate-200
                    bg-white
                    p-4
                    shadow-2xl
                "
            >

                <button
                    type="button"
                    onClick={onClick}
                    className="
                        flex
                        min-w-0
                        flex-1
                        items-center
                        gap-3
                        text-left
                    "
                >

                    <Avatar
                        name={contact.displayName}
                        size="md"
                    />

                    <div className="min-w-0 flex-1">

                        <div className="flex items-center justify-between gap-2">

                            <p className="
                                truncate
                                font-semibold
                                text-slate-800
                            ">
                                {contact.displayName}
                            </p>

                            <span className="
                                shrink-0
                                text-xs
                                text-slate-400
                            ">
                                Now
                            </span>

                        </div>

                        <p className="
                            mt-1
                            truncate
                            text-sm
                            text-slate-500
                        ">
                            {message}
                        </p>

                    </div>

                </button>

                <button
                    type="button"
                    onClick={handleClose}
                    className="
                        shrink-0
                        rounded-full
                        p-1.5
                        text-slate-400
                        transition
                        hover:bg-slate-100
                        hover:text-slate-600
                    "
                    aria-label="Close notification"
                >
                    <X className="h-4 w-4" />
                </button>

            </div>

        </div>
    );
}

export default MessageNotification;