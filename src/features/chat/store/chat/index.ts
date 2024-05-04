import { create } from 'zustand';
import { TMessage, TInitChatState } from './types';

import buildMessage from './utils/build-message';
import initStartMessages from './utils/init-start-messages';

export const useChatStore = create<TInitChatState>((set) => ({
  messages: initStartMessages(),
  waiting: false,
  waitingProduct: null,

  addMessage: (message: Omit<TMessage, 'id'>) => {
    const newMessage = buildMessage(message);

    set((state) => ({
      ...state,
      messages: [...state.messages, newMessage],
    }));
  },

  setWaiting: (waiting: boolean) => {
    set((state) => ({
      ...state,
      waiting,
    }));
  },

  setWaitingProduct: (waitingProduct: TProducts | null) => {
    set((state) => ({
      ...state,
      waitingProduct,
    }));
  },
}));
