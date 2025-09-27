import isNetworkError from "is-network-error";
import { fetchRetry } from "../helper/fetchRetry";

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
        const response = await fetchRetry("/auth/logout", {
            method: "POST",
            credentials: "include",
        });
        return response
    },

    requestResetPassword: async (email) => {
        try {
            const response = await fetch(`${URL}/auth/password/email`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email })
            });
            if (!response.ok) {
                throw await response.json();
            }

            const data = await response.json();
            return data;
        } catch (error) {
            if (isNetworkError(error)) {
                throw { message: "Lỗi mạng! Vui lòng thử lại sau!" };
            }
            throw error;
        }

    },

    resetPassword: async (password, token) => {
        try {
            const response = await fetch(`${URL}/auth/password/reset`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ password: password, token: token })
            });
            if (!response.ok) {
                throw await response.json();
            }

            const data = await response.json();
            return data;
        } catch (error) {
            if (isNetworkError(error)) {
                throw { message: "Lỗi mạng! Vui lòng thử lại sau!" };
            }
            throw error;
        }
    }
}