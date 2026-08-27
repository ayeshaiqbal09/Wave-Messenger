import ContactList from "./ContactList";
import SearchBar from "./SearchBar";
import SidebarHeader from "./SidebarHeader";
import UserProfileMenu from "./UserProfileMenu";
import type { Contact } from "../../../../types/user";
import type { Conversation } from "../../../../types/conversation";
import type { Message } from "../../../../types/message";

type SidebarProps = {
    selectedContact: Contact | null;
    onSelectContact: (contact: Contact) => void;
    contacts: Contact[];
    conversations: Conversation[];
    messages: Message[];
};
function Sidebar({
    selectedContact,
    onSelectContact,
    contacts,
    conversations,
    messages
}: SidebarProps) {
    return (
        <div className="
            h-full
            w-full
            md:w-80
            min-h-0
            bg-white
            border-r
            border-slate-200
            flex
            flex-col
            shadow-sm
            ">
            <SidebarHeader />

            <SearchBar />

            <ContactList
                selectedContact={selectedContact}
                onSelectContact={onSelectContact}
                contacts={contacts}
                conversations={conversations}
                messages={messages}
            />

            <UserProfileMenu />
        </div>
    );
}
export default Sidebar;