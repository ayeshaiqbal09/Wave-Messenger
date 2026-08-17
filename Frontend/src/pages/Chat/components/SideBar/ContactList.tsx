import { contacts } from "../../../../data/contact";
import type { Contact } from "../../../../types/user";
import ContactItem from "./ContactItem";
import { conversations } from "../../../../data/conversations";
import type { Conversation } from "../../../../types/conversation";
import type { Message } from "../../../../types/message";

type ContactListProps = {
    selectedContact: Contact | null;
    onSelectContact: (contact: Contact) => void;
    conversations: Conversation[];
    messages: Message[];
   
};

function ContactList({
    selectedContact,
    onSelectContact,
    conversations,
    messages
}: ContactListProps) {
    const contactData = contacts.map(contact => {

        const conversation = conversations.find(
            conversation =>
                conversation.contactId === contact.id
        );

        const conversationMessages = messages.filter(
            message =>
                message.conversationId === contact.id
        );

        const lastMessage =
            conversationMessages[
                conversationMessages.length - 1
            ];
        const unreadCount = conversationMessages.filter(
    message =>
        message.senderId !== "me" &&
        message.status !== "read"
).length;

        return {
            contact,
            conversation,
            lastMessage,
            unreadCount
        };
    });
    const sortedContacts = [...contactData].sort(
        (a, b) => {

            // Both have conversations
            if (a.lastMessage && b.lastMessage) {

                return (
                    new Date(b.lastMessage.sentAt).getTime() -
                    new Date(a.lastMessage.sentAt).getTime()
                );

            }

            // A has conversation, B doesn't
            if (a.lastMessage) {
                return -1;
            }

            // B has conversation, A doesn't
            if (b.lastMessage) {
                return 1;
            }

            // Neither has a conversation
            return 0;
        }
    );
      
    return (
        <div className="min-h-0
    flex-1
    overflow-y-auto
    px-3
    py-2">

            {sortedContacts.map((item) => (

                <ContactItem
                    key={item.contact.id}
                    contact={item.contact}
                    conversation={item.conversation}
                    lastMessage={item.lastMessage}
                    unreadCount={item.unreadCount}
                    selected={
                        selectedContact?.id === item.contact.id
                    }
                    onClick={() =>
                        onSelectContact(item.contact)
                    }
                />

            ))}

        </div>
    );
}

export default ContactList;