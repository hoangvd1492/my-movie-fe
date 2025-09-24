import { apiFetch } from "../helper/apiFetch";

const URL = process.env.NEXT_PUBLIC_SERVER_URL


export const AuthService = {
    login: async (email, password) => {
        const response = await fetch(`${URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: "include",
            body: JSON.stringify({ email, password })
        });

        return response
    },

    signup: async (username, email, password) => {
        const response = await fetch(`${URL}/auth/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: "include",
            body: JSON.stringify({ username, email, password })
        });

        return response
    },

    refreshToken: async () => {
        const response = await fetch(URL + "/auth/refresh", {
            method: "POST",
            credentials: "include",
        });
        return response
    },

    logout: async () => {
        const response = await apiFetch("/auth/logout", {
            method: "POST",
            credentials: "include",
        });
        return response
    }
}