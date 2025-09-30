const URL = process.env.NEXT_PUBLIC_SERVER_URL

export const ChatBotService = {
    sendMessage: async (message, history) => {
        const response = await fetch(`${URL}/chatbot/chat`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: "include",
            body: JSON.stringify({ message, history })
        });

        return response
    }
}