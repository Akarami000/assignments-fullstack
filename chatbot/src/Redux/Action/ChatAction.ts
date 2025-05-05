import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:3000'; // Replace with your actual API URL
interface  ChatbotResponse {
    sessionId: string;
    message: string;
}

export const fetchChatbotResponse = createAsyncThunk('chat/fetchResponse',async (payload:ChatbotResponse)=>{
    try {
        const responses = await axios.post(`${API_URL}/api/chat`,{
            sessionId: payload.sessionId,
            message: payload.message,
        },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        )
        const data = responses.data;
        return data;
    }catch (error) {
        console.error('Error fetching chatbot response:', error);
        throw error;
    }

})