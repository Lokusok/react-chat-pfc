import { TProduct } from '../products/types';

export type TMessageType = 'default' | 'error';

export type TMessage = {
  id: string;
  from: 'bot' | 'user';
  text: string;
  type: TMessageType;
  image?: string;
  product?: TProduct;
};

export type TChatState = {
  waiting: boolean;
  waitingProduct: TProducts | null;
  messages: TMessage[];
};

export type TChatActions = {
  addMessage: (message: Omit<TMessage, 'id'>) => void;
  setWaiting: (waiting: boolean) => void;
  setWaitingProduct: (waitingProduct: TProducts | null) => void;
};

export type TInitChatState = TChatState & TChatActions;
