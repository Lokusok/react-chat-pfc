import { TMessage } from '../../store/chat/types';

/**
 * Фабрика для создания сообщений
 */
function buildMessage(message: Omit<TMessage, 'id'>): TMessage {
  const messageWithId = {
    id: crypto.randomUUID(),
    ...message,
  };

  return messageWithId;
}

export default buildMessage;
