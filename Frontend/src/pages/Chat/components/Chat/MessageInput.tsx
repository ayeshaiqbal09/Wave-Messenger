import { useState } from "react";
import { Send } from "lucide-react";

type MessageInputProps = {
    onSend: (message: string) => void;
};

function MessageInput({ onSend }: MessageInputProps) {

    const [message, setMessage] = useState("");

    function handleSend() {

        const trimmedMessage = message.trim();

        if (!trimmedMessage) {
            return;
        }

        onSend(trimmedMessage);

        setMessage("");
    }

    function handleKeyDown(
        event: React.KeyboardEvent<HTMLInputElement>
    ) {

        if (event.key === "Enter") {
            handleSend();
        }

    }

    return (
        <div className="
            shrink-0
            border-t
            border-slate-200
            bg-white
            p-3
            sm:p-4
        ">

            <div className="
                flex
                items-center
                gap-2
                rounded-2xl
                bg-slate-100
                px-3
                py-2
                transition
                focus-within:ring-2
                focus-within:ring-blue-500
            ">

                <input
                    type="text"
                    value={message}
                    onChange={(event) =>
                        setMessage(event.target.value)
                    }
                    onKeyDown={handleKeyDown}
                    placeholder="Type a message..."
                    className="
                        min-w-0
                        flex-1
                        bg-transparent
                        px-2
                        py-2
                        text-sm
                        text-slate-800
                        outline-none
                        placeholder:text-slate-400
                    "
                />

                <button
                    type="button"
                    onClick={handleSend}
                    disabled={!message.trim()}
                    className="
                        flex
                        h-10
                        w-10
                        shrink-0
                        items-center
                        justify-center
                        rounded-full
                        bg-blue-600
                        text-white
                        transition
                        hover:bg-blue-700
                        active:scale-95
                        disabled:cursor-not-allowed
                        disabled:opacity-40
                    "
                    aria-label="Send message"
                >
                    <Send className="h-4 w-4" />
                </button>

            </div>

        </div>
    );
}

export default MessageInput;