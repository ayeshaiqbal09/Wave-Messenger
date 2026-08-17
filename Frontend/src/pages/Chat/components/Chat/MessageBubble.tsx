import type { Message } from "../../../../types/message";
import { Check, CheckCheck } from "lucide-react";
type MessageBubbleProps = {
    message: Message;
    isMine: boolean;
};

function MessageBubble({
    message,
    isMine
}: MessageBubbleProps) {

    return (
        <div
            className={`
                flex
                w-full
                ${isMine ? "justify-end" : "justify-start"}
            `}
        >

            <div
                className={`
                    max-w-[75%]
                    rounded-2xl
                    px-4
                    py-2
                    shadow-sm
                    ${
                        isMine
                            ? "rounded-br-md bg-blue-600 text-white"
                            : "rounded-bl-md bg-white text-slate-800"
                    }
                `}
            >

                <p className="break-words">
                    {message.text}
                </p>

                <div
    className={`
        mt-1
        flex
        items-center
        justify-end
        gap-1
        text-[11px]
        ${
            isMine
                ? "text-blue-100"
                : "text-slate-400"
        }
    `}
>
    <span>
        {new Date(message.sentAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit"
        })}
    </span>

    {isMine && (
        <>
            {message.status === "sent" && (
                <Check className="h-3.5 w-3.5" />
            )}

            {message.status === "delivered" && (
                <CheckCheck className="h-3.5 w-3.5" />
            )}

            {message.status === "read" && (
                <CheckCheck className="h-3.5 w-3.5 text-sky-200" />
            )}

            {message.status === "undelivered" && (
                <span className="font-bold text-red-200">
                    !
                </span>
            )}
        </>
    )}
</div>

            </div>

        </div>
    );
}

export default MessageBubble;