import { TMessage } from '../../store/chat/types';
import { TProduct } from '../../store/products/types';

/**
 * Фабрика для создания сообщений бота
 */
function buildBotMessage(product: TProduct): TMessage {
  const message: TMessage = {
    id: crypto.randomUUID(),
    from: 'bot',
    text: `Нашёл продукт! Думаю, вам подойдёт - ${product.title}.`,
    type: 'default',
    image: product.image,
    product,
  };

  return message;
}

export default buildBotMessage;
