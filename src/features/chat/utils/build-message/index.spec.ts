import { test, expect } from 'vitest';
import buildMessage from '.';
import { TMessage } from '../../store/chat/types';

test('Фабрика по производству сообщений пользователя работает корректно', () => {
  const messageIn: Omit<TMessage, 'id'> = {
    from: 'user',
    text: 'hello world',
    type: 'default',
    image: 'https://placehold.co/400x400',
  };
  const expectedMessage = {
    id: (id: any) => typeof id === 'string',
    from: (type: string) => type === 'user',
    text: (text: string) => text === 'hello world',
    type: (type: string) => type === 'default',
    image: (image: string) => image === 'https://placehold.co/400x400',
  };
  const message = buildMessage(messageIn);

  const result = Object.keys(message).every((key) => {
    // @ts-ignore
    return expectedMessage[key](message[key]);
  });

  expect(result).toBe(true);
});
