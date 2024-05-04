import { TMessage } from '../../types';

/**
 * Инициализация стартовых сообщений в чате
 */
function initStartMessages(): TMessage[] {
  return [
    {
      id: crypto.randomUUID(),
      from: 'bot',
      text: 'Я - бот, который поможет Вам подобрать продукты под Ваши предпочтения БЖУ!',
    },
    {
      id: crypto.randomUUID(),
      from: 'bot',
      text: 'Внизу расположены кнопки. Нажмите на них, чтобы получить продукт под желаемый запрос.',
    },
  ];
}

export default initStartMessages;
