"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface AuthContextType {
    isLoggedIn: boolean;
    login: () => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    useEffect(() => {
        const cookie = localStorage.getItem("cookie");
        setIsLoggedIn(!!cookie);
    }, []);

    const login = () => {
        localStorage.setItem("cookie", "123123");
        setIsLoggedIn(true);
    };

    const logout = () => {
        localStorage.removeItem("cookie");
        setIsLoggedIn(false);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within AuthProvider");
    return context;
};
