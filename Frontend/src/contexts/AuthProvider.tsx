import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import type { User } from "../types/user";
import { getMyProfile } from "../services/userService";

export function AuthProvider({
    children
}: {
    children: React.ReactNode;
}) {
    const [isAuthenticated, setIsAuthenticated] =
        useState(!!localStorage.getItem("token"));

    const [currentUser, setCurrentUser] =
        useState<User | null>(null);

    useEffect(() => {
        async function loadCurrentUser() {
            const token = localStorage.getItem("token");

            if (!token) {
                return;
            }

            try {
                const user = await getMyProfile();

                setCurrentUser(user);
            } catch (error) {
                console.error(
                    "Failed to load current user:",
                    error
                );

                localStorage.removeItem("token");
                setIsAuthenticated(false);
                setCurrentUser(null);
            }
        }

        loadCurrentUser();
    }, []);

    const login = (user: User, token: string) => {
        localStorage.setItem("token", token);

        setCurrentUser(user);
        setIsAuthenticated(true);
    };

    const logout = () => {
        localStorage.removeItem("token");

        setCurrentUser(null);
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                currentUser,
                login,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}