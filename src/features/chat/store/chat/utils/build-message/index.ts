import { TMessage } from '../../types';

/**
 * Фабрика для создания сообщений
 */
function buildMessage({ from, text, image }: Omit<TMessage, 'id'>): TMessage {
  return {
    id: crypto.randomUUID(),
    from,
    text,
    image,
  };
}

export default buildMessage;
