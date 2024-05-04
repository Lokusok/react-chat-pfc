export type TMessage = {
  id: string;
  from: 'bot' | 'user';
  text: string;
  image?: string;
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
