import { useState } from "react";
import { BASE_URL } from "../consts/api";

interface LoginResponse {
    token: string;
    email: string;
}

export const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const login = async (email: string, password: string): Promise<LoginResponse | null> => {
        try {
            setLoading(true);
            setError(null);

            const response = await fetch(`${BASE_URL}/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                const errorMessage = (await response.json())?.message || "Invalid email or password";
                setError(errorMessage);
                return null;
            }

            const data: LoginResponse = await response.json();
            localStorage.setItem("token", data.token);
            return data;
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message || "Network error"); 
            }
            return null;
        } finally {
            setLoading(false);
        }
    };

    return { login, loading, error };
};

