import { useState } from "react";
import type { Contact } from "../../types/user";
import Sidebar from "./components/SideBar/Sidebar";
import ChatWindow from "./components/Chat/ChatWindow";
import type { Message } from "../../types/message";
import type { Conversation } from "../../types/conversation";
import MessageNotification from "../../components/ui/MessageNotification";
import { messages as initialMessages } from "../../data/messages";
import { conversations as initialConversations } from "../../data/conversations";
import { contacts } from "../../data/contact";
import { playNotificationSound } from "../../types/notificationSound";
function ChatLayout() {

    const [selectedContact, setSelectedContact] =
        useState<Contact | null>(null);

    const [messages, setMessages] =
        useState<Message[]>(initialMessages);

    const [conversations, setConversations] =
        useState<Conversation[]>(initialConversations);
    type Notification = {
    id: string;
    contact: Contact;
    message: string;
};

const [notifications, setNotifications] = useState<Notification[]>([]);
    
function simulateIncomingMessage() {

    const contact = contacts.find(
        contact => contact.id === "2"
    );

    if (!contact) {
        return;
    }

    const incomingMessage: Message = {
        id: crypto.randomUUID(),
        conversationId: contact.id,
        text: "Hey! Are you free?",
        senderId: contact.id,
        sentAt: new Date().toISOString(),
        status: selectedContact?.id === contact.id
        ? "read"
        : "delivered"
    };

    setMessages(prev => [
        ...prev,
        incomingMessage
    ]);

    // Only show notification if this chat isn't currently open
    if (selectedContact?.id !== contact.id) {
    showNotification(
        contact,
        incomingMessage.text
    );
}
}
function handleSelectContact(contact: Contact) {

    setMessages(prev =>
        prev.map(message =>
            message.conversationId === contact.id &&
            message.senderId !== "me" &&
            message.status !== "read"
                ? {
                    ...message,
                    status: "read"
                }
                : message
        )
    );

    setSelectedContact(contact);
}
function showNotification(
    contact: Contact,
    message: string
) {
    const notification: Notification = {
        id: crypto.randomUUID(),
        contact,
        message
    };

    setNotifications(prev => {

        const updated = [
            ...prev,
            notification
        ];

        // Maximum 2 notifications
        return updated.slice(-2);
    });

    playNotificationSound();

    // Automatically remove this notification
    setTimeout(() => {

        setNotifications(prev =>
            prev.filter(
                item => item.id !== notification.id
            )
        );

    }, 4000);
}

    return (
        <div className="
    h-screen
    flex
    overflow-hidden
    bg-slate-100
">

            <Sidebar
                conversations={conversations}
                selectedContact={selectedContact}
                onSelectContact={handleSelectContact}
                messages={messages}
            />
                
            <ChatWindow
                selectedContact={selectedContact}
                messages={messages}
                onMessagesChange={setMessages}
                setConversations={setConversations}
                onBack={() => setSelectedContact(null)}
            />
            <div className="
    fixed
    right-4
    top-4
    z-[100]
    flex
    w-[calc(100%-2rem)]
    max-w-sm
    flex-col
    gap-3
">
    {notifications.map(notification => (
        <MessageNotification
            key={notification.id}
            contact={notification.contact}
            message={notification.message}
            onClose={() => {
                setNotifications(prev =>
                    prev.filter(
                        item =>
                            item.id !== notification.id
                    )
                );
            }}
            onClick={() => {

                handleSelectContact(
                    notification.contact
                );

                setNotifications(prev =>
                    prev.filter(
                        item =>
                            item.id !== notification.id
                    )
                );

            }}
        />
    ))}
</div>
            <button
            onClick={simulateIncomingMessage}
            className="
                fixed
                bottom-4
                right-4
                z-50
                rounded-xl
                bg-purple-600
                px-4
                py-2
                text-sm
                font-semibold
                text-white
                shadow-lg
                transition
                hover:bg-purple-700
                active:scale-95
            "
        >
            Simulate Message
        </button>
        </div>
    );
}

export default ChatLayout;