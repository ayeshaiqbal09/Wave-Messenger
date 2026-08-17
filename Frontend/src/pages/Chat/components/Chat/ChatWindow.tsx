import type { Contact } from "../../../../types/user";
import { MessageCircle } from "lucide-react";
import MessageList from "./MessageList";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import type { Message } from "../../../../types/message";
import type { Conversation } from "../../../../types/conversation";
import ChatBackground from "./Chatbackground";
type ChatWindowProps = {
    selectedContact: Contact | null;
    messages: Message[];
    onMessagesChange: React.Dispatch<React.SetStateAction<Message[]>>;
    setConversations: React.Dispatch<React.SetStateAction<Conversation[]>>;
    onBack: () => void;
};

function ChatWindow({
    selectedContact,
    messages,
    onMessagesChange,
    setConversations,
    onBack
}: ChatWindowProps) {

    if (!selectedContact) {
        return (
            <div className="
                flex
                h-full
                min-h-0
                flex-1
                flex-col
                bg-slate-50
            ">

                <div className="
                    flex
                    h-full
                    items-center
                    justify-center
                    text-center
                ">

                    <div>

                        <div className="
                            mx-auto
                            mb-4
                            flex
                            h-20
                            w-20
                            items-center
                            justify-center
                            rounded-full
                            bg-blue-50
                        ">
                            <MessageCircle className="
                                h-10
                                w-10
                                text-blue-600
                            " />
                        </div>

                        <h2 className="
                            text-2xl
                            font-bold
                            text-slate-800
                        ">
                            Wave Messenger
                        </h2>

                        <p className="
                            mt-2
                            text-slate-500
                        ">
                            Select a conversation to start chatting.
                        </p>

                    </div>

                </div>

            </div>
        );
    }

    const conversationMessages = messages.filter(
        message =>
            message.conversationId === selectedContact.id
    );
    

    return (
    <div className="
        relative
        flex
        min-h-0
        flex-1
        flex-col
        overflow-hidden
        bg-slate-50
    ">

        {/* Chat Header - fixed */}
        <ChatHeader
            contact={selectedContact}
            onBlock={() => {
                console.log(
                    "Block:",
                    selectedContact.id
                );
            }}
            onBack={onBack}
        />

        {/* Message area */}
        <div className="
            relative
            min-h-0
            flex-1
            overflow-hidden
        ">

            <ChatBackground />

            {/* Scrollable messages */}
            <div className="
                relative
                h-full
                overflow-y-auto
                px-4
                py-6
                sm:px-6
            ">

                <MessageList
                    messages={conversationMessages}
                    currentUserId="me"
                    contactName={selectedContact.displayName}
                />

            </div>

        </div>

        {/* Message input - fixed */}
        <MessageInput
            onSend={(text) => {

                const newMessage: Message = {
                    id: crypto.randomUUID(),
                    conversationId: selectedContact.id,
                    text,
                    senderId: "me",
                    sentAt: new Date().toISOString(),
                    status: "sent"
                };

                onMessagesChange(prev => [
                    ...prev,
                    newMessage
                ]);

                setConversations(prev => {

                    const existingConversation = prev.find(
                        conversation =>
                            conversation.contactId === selectedContact.id
                    );

                    if (!existingConversation) {

                        return [
                            ...prev,
                            {
                                id: crypto.randomUUID(),
                                contactId: selectedContact.id,
                                lastMessage: text,
                                lastMessageAt: newMessage.sentAt,
                                unreadCount: 0
                            }
                        ];

                    }

                    return prev.map(conversation =>
                        conversation.contactId === selectedContact.id
                            ? {
                                ...conversation,
                                lastMessage: text,
                                lastMessageAt: newMessage.sentAt
                            }
                            : conversation
                    );

                });

            }}
        />

    </div>
);
}

export default ChatWindow;