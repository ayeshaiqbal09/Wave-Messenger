export type MessageStatus =
    | "Sending"
    | "Sent"
    | "Delivered"
    | "Read"
    | "Undelivered";

export interface Message {
    id: string;
    conversationId: string;
    text: string;
    senderId: string;
    sentAt: string;
    status: MessageStatus;
}