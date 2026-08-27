import api from "../api/axios";
import type { Conversation } from "../types/conversation";

export interface CreateConversationRequest {
    otherUserId: string;
}

export async function getConversations(): Promise<Conversation[]> {
    const response = await api.get<Conversation[]>(
        "/conversations"
    );

    return response.data;
}

export async function createConversation(
    otherUserId: string
): Promise<Conversation> {
    const response = await api.post<Conversation>(
        "/conversations",
        {
            otherUserId
        }
    );

    return response.data;
}