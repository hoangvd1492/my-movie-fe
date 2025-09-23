const URL = process.env.NEXT_PUBLIC_SERVER_URL

export const AuthService = {
    login: async (email, password) => {
        console.log(URL);

        const response = await fetch(`${URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        if (!response.ok) {
            throw await response.json();
        }

        const data = await response.json();
        return data;
    },

    signup: async (username, email, password) => {
        console.log(URL);

        const response = await fetch(`${URL}/auth/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, email, password })
        });

        if (!response.ok) {
            throw await response.json();
        }

        const data = await response.json();
        return data;
    }
}