import { useState } from "react";
import type { Contact } from "../../types/user";
import Sidebar from "./components/SideBar/Sidebar";
import ChatWindow from "./components/Chat/ChatWindow";
import type { Message } from "../../types/message";
import type { Conversation } from "../../types/conversation";
import MessageNotification from "../../components/ui/MessageNotification";
import { playNotificationSound } from "../../types/notificationSound";
import { useEffect, useRef } from "react";
import chatConnection from "../../services/chatConnection";
import { getUsers } from "../../services/userService";
import { useAuth } from "../../hooks/useAuth";
import { getConversations } from "../../services/conversationService";
function ChatLayout() {
    
    const { currentUser } = useAuth();
    const [contacts, setContacts] = useState<Contact[]>([]);
    const contactsRef =
    useRef<Contact[]>([]);
    const [selectedContact, setSelectedContact] =
        useState<Contact | null>(null);
    const selectedContactRef =
    useRef<Contact | null>(null);
    const [messages, setMessages] =
        useState<Message[]>([]);

    const [conversations, setConversations] =
    useState<Conversation[]>([]);
    type Notification = {
    id: string;
    contact: Contact;
    message: string;
};

const [notifications, setNotifications] = useState<Notification[]>([]);
useEffect(() => {
    async function loadConversations() {
        try {
            const data = await getConversations();

            setConversations(data);
        } catch (error) {
            console.error(
                "Failed to load conversations:",
                error
            );
        }
    }

    loadConversations();
}, []);
    

useEffect(() => {
    async function loadUsers() {
        try {
            const users = await getUsers();
            const otherUsers = users.filter(
    user => user.id !== currentUser?.id
);
           setContacts(otherUsers);
contactsRef.current = otherUsers;
        } catch (error) {
            console.error(
                "Failed to load users:",
                error
            );
        }
    }

    loadUsers();
}, []);
function handleSelectContact(contact: Contact) {
    selectedContactRef.current = contact;
    setSelectedContact(contact);
    const conversation =
        conversations.find(
            conversation =>
                conversation.otherUserId === contact.id
        );
    
    
    if (!conversation) {
        return;
    }

    const unreadMessages =
        messages.filter(
            message =>
                message.conversationId === conversation.id &&
                message.senderId !== currentUser?.id &&
                message.status !== "Read"
        );

    unreadMessages.forEach(message => {

        chatConnection
            .invoke(
                "MarkMessageAsRead",
                message.id
            )
            .catch(error => {
                console.error(
                    "Failed to mark message as read:",
                    error
                );
            });

    });
    

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
useEffect(() => {

   function handleReceiveMessage(message: Message) {

    console.log(
        "SignalR received message:",
        message
    );

    setMessages(prev => [
        ...prev,
        message
    ]);

    const isCurrentConversation =
        selectedContactRef.current?.id ===
        message.senderId;

    // Always acknowledge delivery.
    chatConnection
        .invoke(
            "MarkMessageAsDelivered",
            message.id
        )
        .catch(error => {
            console.error(
                "Failed to mark message as delivered:",
                error
            );
        });

    if (isCurrentConversation) {

        // User is already looking at this conversation.
        // Mark the message as read.
        chatConnection
            .invoke(
                "MarkMessageAsRead",
                message.id
            )
            .catch(error => {
                console.error(
                    "Failed to mark message as read:",
                    error
                );
            });

        return;
    }

    // Conversation isn't open.
    // Show notification instead.
    const contact =
    contactsRef.current.find(
            contact =>
                contact.id === message.senderId
        );
        console.log("Notification debug:", {
    senderId: message.senderId,
    contacts: contactsRef.current,
    contactFound: contact,
    selectedContact: selectedContactRef.current
});

    if (contact) {
        console.log("SHOWING NOTIFICATION");
        showNotification(
            contact,
            message.text
        );
    }
    else {
    console.log("NO CONTACT FOUND FOR NOTIFICATION");
}
}
function handleMessageStatusUpdated(
    message: Message
) {
    console.log(
        "Message status updated:",
        message
    );

    setMessages(prev =>
        prev.map(existingMessage =>
            existingMessage.id === message.id
                ? message
                : existingMessage
        )
    );
}

    chatConnection.on(
        "ReceiveMessage",
        handleReceiveMessage
    );
    chatConnection.on(
    "MessageStatusUpdated",
    handleMessageStatusUpdated
);

    async function startConnection() {
        try {
            if (chatConnection.state === "Disconnected") {
                await chatConnection.start();

                console.log(
                    "SignalR connected:",
                    chatConnection.connectionId
                );
            }
        } catch (error) {
            console.error(
                "SignalR connection failed:",
                error
            );
        }
    }

    startConnection();

    return () => {
    chatConnection.off(
        "ReceiveMessage",
        handleReceiveMessage
    );

    chatConnection.off(
        "MessageStatusUpdated",
        handleMessageStatusUpdated
    );
};

}, []);

    return (
        <div className="
    h-screen
    flex
    overflow-hidden
    bg-slate-100
">
    {/* Sidebar */}
        <div
    className={
        selectedContact
            ? "hidden md:flex md:w-[350px] md:flex-shrink-0"
            : "flex w-full md:w-[350px] md:flex-shrink-0"
    }
>
            <Sidebar
                contacts={contacts}
                conversations={conversations}
                selectedContact={selectedContact}
                onSelectContact={handleSelectContact}
                messages={messages}
            />
 </div>   
 {/* Chat */}
<div
    className={
        selectedContact
            ? "flex w-full flex-1"
            : "hidden md:flex md:flex-1"
    }
>           
            <ChatWindow
                selectedContact={selectedContact}
                messages={messages}
                onMessagesChange={setMessages}
                conversations={conversations}
                currentUserId={currentUser?.id ?? ""}
                onConversationCreated={(conversation) => {
                    setConversations(prev => [
                        ...prev,
                        conversation
                    ]);
                }}
                onBack={() => {
    selectedContactRef.current = null;
    setSelectedContact(null);
}}
            />

            </div> 


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
            
        </div>
    );
}

export default ChatLayout;