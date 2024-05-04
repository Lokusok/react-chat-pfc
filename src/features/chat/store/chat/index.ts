import { create } from 'zustand';
import { TMessage, TInitChatState } from './types';

import buildMessage from '../../utils/build-message';
import initStartMessages from './utils/init-start-messages';

export const useChatStore = create<TInitChatState>((set) => ({
  messages: initStartMessages(),
  waiting: false,
  waitingProduct: null,

  addMessage: (message: Omit<TMessage, 'id'> | TMessage) => {
    let correctMessage = { ...message };
    if (!('id' in message)) correctMessage = buildMessage(message);

    set((state) => ({
      ...state,
      messages: [...state.messages, correctMessage as TMessage],
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
