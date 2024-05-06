import { expect, test } from 'vitest';
import buildBotMessage from '.';
import shallowequal from 'shallowequal';

import { TProduct } from '../../store/products/types';

test('Фабрика по производству сообщений бота работает корректно', () => {
  const product: TProduct = {
    id: '123',
    title: 'Книга по React',
    description: 'Lorem ipsum dolor sit amet.',
    image: 'https://placehold.co/400x400',
  };
  const expectedResult = {
    id: (id: any) => typeof id === 'string',
    from: (from: string) => from === 'bot',
    text: (text: string) =>
      text === `Нашёл продукт! Думаю, вам подойдёт - ${product.title}.`,
    type: (type: string) => type === 'default',
    image: (image: string) => image === product.image,
    product: (resProduct: TProduct) => shallowequal(resProduct, product),
  };

  const botMessage = buildBotMessage(product);
  const botMessageToTest = { ...botMessage };

  // @ts-ignore
  delete botMessageToTest.product.id;

  const result = Object.keys(expectedResult).every((key) => {
    // @ts-ignore
    return expectedResult[key](botMessageToTest[key]);
  });

  console.log(botMessage, expectedResult);

  expect(result).toBe(true);
});
