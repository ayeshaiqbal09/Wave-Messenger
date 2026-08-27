import api from "../api/axios";
import type { Contact } from "../types/user";
import type { User } from "../types/user";
export async function getUsers(): Promise<Contact[]> {
    const response = await api.get<Contact[]>("/users");

    return response.data;
}
export async function getMyProfile(): Promise<User> {
    const response = await api.get<User>("/users/me");

    return response.data;
}