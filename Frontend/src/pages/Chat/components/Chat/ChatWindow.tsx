import type { Contact } from "../../../../types/user";
import { MessageCircle } from "lucide-react";
import MessageList from "./MessageList";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import type { Message } from "../../../../types/message";
import ChatBackground from "./ChatBackground";
import type { Conversation } from "../../../../types/conversation";
import { useEffect } from "react";
import { getMessages } from "../../../../services/messageService";
import { sendMessage } from "../../../../services/messageService";
import { createConversation } from "../../../../services/conversationService";

type ChatWindowProps = {
    selectedContact: Contact | null;
    messages: Message[];
    onMessagesChange: React.Dispatch<React.SetStateAction<Message[]>>;
    conversations: Conversation[];
    currentUserId: string;
    onBack: () => void;
    onConversationCreated: (conversation: Conversation) => void;
};

function ChatWindow({
    selectedContact,
    messages,
    onMessagesChange,
    currentUserId,
    conversations,
    onConversationCreated,
    onBack
}: ChatWindowProps) {

    const conversation = selectedContact
        ? conversations.find(
            conversation =>
                conversation.otherUserId === selectedContact.id
        )
        : undefined;

    const conversationMessages = conversation
    ? messages.filter(
        message =>
            message.conversationId === conversation.id
    )
    : [];
    
useEffect(() => {
    if (!conversation) {
        return;
    }
    const conversationId = conversation.id;
    async function loadMessages() {
        try {
            const data = await getMessages(conversationId);

            onMessagesChange(prev => {
                const otherMessages = prev.filter(
                    message =>
                        message.conversationId !== conversationId
                );

                return [
                    ...otherMessages,
                    ...data
                ];
            });

        } catch (error) {
            console.error(
                "Failed to load messages:",
                error
            );
        }
    }

    loadMessages();
}, [conversation?.id]);

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
                    currentUserId={currentUserId}
                    contactName={selectedContact.displayName}
                />

            </div>

        </div>

        {/* Message input - fixed */}
        <MessageInput
            onSend={async (text) => {
            try {
                let activeConversation = conversation;

                if (!activeConversation) {
                    activeConversation =
                        await createConversation(
                            selectedContact.id
                        );

                    onConversationCreated(activeConversation);
                }

                const newMessage = await sendMessage({
                    conversationId: activeConversation.id,
                    text
                });

                onMessagesChange(prev => [
                    ...prev,
                    newMessage
                ]);

            } catch (error) {
                console.error(
                    "Failed to send message:",
                    error
                );
            }
        }}
        />

    </div>
);
}

export default ChatWindow;