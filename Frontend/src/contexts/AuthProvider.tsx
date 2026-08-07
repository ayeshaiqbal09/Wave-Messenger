import { useState } from "react";
import { AuthContext } from "./AuthContext";

export function AuthProvider({
    children
}: {
    children: React.ReactNode;
}) {
    const [isAuthenticated, setIsAuthenticated] = useState(
        !!localStorage.getItem("token")
    );
    console.log("AuthProvider render:", isAuthenticated);
    const login = (token: string) => {

        console.log("AuthProvider login called");

        localStorage.setItem("token", token);

        setIsAuthenticated(true);
    };
    const logout = () => {

        localStorage.removeItem("token");

        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                login,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}