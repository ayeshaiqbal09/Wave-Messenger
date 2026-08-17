import type { Message } from "../types/message";

export const messages: Message[] = [

    {
        id: "1",
        conversationId: "1",
        text: "Hey! How are you?",
        senderId: "2",
        sentAt: "2026-08-16T10:30:00",
        status: "read"
    },

    {
        id: "2",
        conversationId: "1",
        text: "I'm good! Working on Wave Messenger 😄",
        senderId: "me",
        sentAt: "2026-08-16T10:30:00",
        status: "read"
    },

    {
        id: "3",
        conversationId: "1",
        text: "Oh nice! How is it going?",
        senderId: "2",
        sentAt: "2026-08-16T10:30:00",
        status: "read"
    },

    {
        id: "4",
        conversationId: "1",
        text: "Pretty good. The UI is finally starting to look like an actual messenger.",
        senderId: "me",
        sentAt: "2026-08-16T10:30:00",
        status: "read"
    }

];