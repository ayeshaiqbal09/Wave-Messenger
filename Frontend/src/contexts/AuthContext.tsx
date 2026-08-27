import { createContext } from "react";
import type { User } from "../types/user";


export interface AuthContextType {
    isAuthenticated: boolean;

    currentUser: User | null;

    login: (user: User, token: string) => void;

    logout: () => void;
}

export const AuthContext =
    createContext<AuthContextType | null>(null);