export type MessageStatus =
    | "sending"
    | "sent"
    | "delivered"
    | "read"
    | "undelivered";

export interface Message {
    id: string;
    conversationId: string;
    text: string;
    senderId: string;
    sentAt: string;
    status: MessageStatus;
}