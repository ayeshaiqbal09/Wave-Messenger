import api from "../api/axios";
import type { Message } from "../types/message";

export interface SendMessageRequest {
    conversationId: string;
    text: string;
}

export async function getMessages(
    conversationId: string
): Promise<Message[]> {
    const response = await api.get<Message[]>(
        `/messages/${conversationId}`
    );

    return response.data;
}

export async function sendMessage(
    request: SendMessageRequest
): Promise<Message> {
    const response = await api.post<Message>(
        "/messages",
        request
    );

    return response.data;
}