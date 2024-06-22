// src/messagesSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Message } from '../utils/types';

interface MessagesState {
  messages: Message[];
}

const initialState: MessagesState = {
  messages: [],
};

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<Message>) => {
      state.messages.push(action.payload);
    },
    removeMessage: (state, action: PayloadAction<number>) => {
      state.messages = state.messages.filter(message => message.id !== action.payload);
    },
    clearMessages: (state) => {
        state.messages = [];
    },
  },
});

export const { addMessage, removeMessage } = messagesSlice.actions;

export default messagesSlice.reducer;
