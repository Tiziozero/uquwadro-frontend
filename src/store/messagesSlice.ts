import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Message } from '../utils/types';

interface ChannelMessages {
    messages: Message[];
}

interface MessagesState {
    messages: { [key: string]: ChannelMessages };
}

const initialState: MessagesState = {
  messages: {},
};

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<Message>) => {
      const channelId = action.payload.channel_id;
      if (!state.messages[channelId]) {
        state.messages[channelId] = { messages: [] };
      }
      state.messages[channelId].messages.push(action.payload);
    },
    removeMessage: (state, action: PayloadAction<{ channelId: string, messageId: number }>) => {
      const { channelId, messageId } = action.payload;
      if (state.messages[channelId]) {
        state.messages[channelId].messages = state.messages[channelId].messages.filter(message => message.id !== messageId);
      }
    },
    clearMessages: (state) => {
      state.messages = {};
    },
  },
});

export const { addMessage, removeMessage, clearMessages } = messagesSlice.actions;

export default messagesSlice.reducer;

