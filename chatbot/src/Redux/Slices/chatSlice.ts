
import { createSlice,PayloadAction } from "@reduxjs/toolkit";
import { fetchChatbotResponse } from "../Action/ChatAction";

interface ChatState{
    message: any;
    loading: boolean;
    error: string | null;
  }

const initialState: ChatState = {
    message:[],
    loading: false,
    error: null,
}

const chatSlice = createSlice({
    name :"chat",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
            .addCase(fetchChatbotResponse.pending,(state)=>{
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchChatbotResponse.fulfilled,(state,action)=>{
                state.loading = false;
                state.message = action.payload 
            })
            .addCase(fetchChatbotResponse.rejected,(state,action)=>{
                state.loading=false;
                state.error = action.error.message || 'Failed to submit'
            })
        }
    })

export const chatReducer = chatSlice.reducer;