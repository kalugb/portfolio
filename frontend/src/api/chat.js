import axios from "axios";

const API_BASE_URL = "http://localhost:8000";

async function sendChatMessage(message) {
    const response = await axios.post(`${API_BASE_URL}/api/chat`, {
        message,
    });
    return response.data.reply;
}

export { sendChatMessage };