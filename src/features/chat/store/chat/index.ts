import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

import { TMessage, TInitChatState } from './types';

import buildMessage from '../../utils/build-message';
import initStartMessages from './utils/init-start-messages';

const initState = {
  messages: initStartMessages(),
  waiting: false,
  waitingProduct: null,
};

export const useChatStore = create<TInitChatState>()(
  persist(
    (set) => ({
      ...initState,

      resetMessages: () => {
        set(initState);
      },

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
    }),
    {
      name: 'chat2-storage',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
