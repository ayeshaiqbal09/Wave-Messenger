import type { Message } from "../../../../types/message";
import { useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";

type MessageListProps = {
    messages: Message[];
    currentUserId: string;
    contactName: string;
};

function MessageList({
    messages,
    currentUserId,
    contactName
}: MessageListProps) {
    const messagesEndRef = useRef<HTMLDivElement>(null);
    useEffect(() => {

    messagesEndRef.current?.scrollIntoView({
        behavior: "smooth"
    });

}, [messages]);
    if (messages.length === 0) {
        return (
            <div className="
                flex
                min-h-0
                flex-1
                items-center
                justify-center
                px-6
            ">
                <div className="text-center">

                    <div className="
                        mx-auto
                        mb-4
                        flex
                        h-16
                        w-16
                        items-center
                        justify-center
                        rounded-full
                        bg-blue-50
                    ">
                        💬
                    </div>

                    <h3 className="
                        text-lg
                        font-semibold
                        text-slate-800
                    ">
                        Start a conversation
                    </h3>

                    <p className="
                        mt-2
                        max-w-sm
                        text-sm
                        text-slate-500
                    ">
                        Send a message to {contactName} to
                        start chatting.
                    </p>

                </div>
            </div>
        );
    }

    return (
        <div className="
            min-h-0
            flex-1
            overflow-y-auto
            space-y-3
            px-4
            py-6
            sm:px-6
        ">
            {messages.map((message) => (
                <MessageBubble
                    key={message.id}
                    message={message}
                    isMine={message.senderId === currentUserId}
                />
            ))}
            <div ref={messagesEndRef} />
        </div>
    );
}

export default MessageList;