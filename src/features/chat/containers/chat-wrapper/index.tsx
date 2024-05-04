import { memo, useState } from 'react';

import Chat from '../../components/chat';

import ApiService from '../../../../api/api-service';
import { TDialogMessage } from '../../types';

const phrases = {
  aLotCarbohydrates: 'Хочу продукт с большим количеством углеводов.',
  aLotFats: 'Хочу продукт с большим количеством жиров.',
  aLotProteins: 'Хочу продукт с большим количеством белков.',

  aSmallCarbohydrates: 'Хочу продукт с малым количеством углеводов.',
  aSmallFats: 'Хочу продукт с малым количеством жиров',
  aSmallProteins: 'Хочу продукт с малым количеством белков.',

  balanced: 'Хочу сбалансированный продукт.',
};

function initDialog(): TDialogMessage[] {
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

function buildMessage({
  from,
  text,
  image,
}: Omit<TDialogMessage, 'id'>): TDialogMessage {
  return {
    id: crypto.randomUUID(),
    from,
    text,
    image,
  };
}

function ChatWrapper() {
  const [dialog, setDialog] = useState<TDialogMessage[]>(initDialog);
  const [waiting, setIsWaiting] = useState(false);
  const [waitingProduct, setWaitingProduct] = useState<TProducts | null>(null);

  const helpers = {
    fetchProduct: async (product: TProducts, aLot = false) => {
      try {
        setIsWaiting(true);
        setWaitingProduct(product);

        if (product === 'balanced') {
          const text = phrases[product];
          console.log({ product, text });
          setDialog((d) => [...d, buildMessage({ from: 'user', text })]);
        } else {
          let key = aLot ? 'aLot' : 'aSmall';
          key += product.charAt(0).toUpperCase() + product.substring(1);
          const text = phrases[key as keyof typeof phrases];

          setDialog((d) => [...d, buildMessage({ from: 'user', text })]);
        }

        await new Promise((res) => setTimeout(res, 1000));
        const productItem = await ApiService.getProduct({
          product,
          aLot,
        });

        setDialog((d) => [
          ...d,
          buildMessage({
            from: 'bot',
            text: 'Нашёл продукт! Думаю, вам подойдёт - Петрушка.',
            image:
              'https://medseen.ru/wp-content/uploads/2023/10/scale_1200.jpeg',
          }),
        ]);

        return productItem;
      } finally {
        setIsWaiting(false);
        setWaitingProduct(null);
      }
    },
  };

  const callbacks = {
    getLargeCarbohydrates: async () => {
      const productItem = await helpers.fetchProduct('carbohydrates', true);
      console.log(productItem);
    },
    getLargeFats: async () => {
      const productItem = await helpers.fetchProduct('fats', true);
      console.log(productItem);
    },
    getLargeProteins: async () => {
      const productItem = await helpers.fetchProduct('proteins', true);
      console.log(productItem);
    },

    getSmallCarbohydrates: async () => {
      const productItem = await helpers.fetchProduct('carbohydrates', false);
      console.log(productItem);
    },
    getSmallFats: async () => {
      const productItem = await helpers.fetchProduct('fats', false);
      console.log(productItem);
    },
    getSmallProteins: async () => {
      const productItem = await helpers.fetchProduct('proteins', false);
      console.log(productItem);
    },

    getBalanced: async () => {
      const productItem = await helpers.fetchProduct('balanced');
      console.log(productItem);
    },
  };

  console.log({ waiting });

  return (
    <>
      <Chat
        loadingProduct={waitingProduct}
        loading={waiting}
        callbacks={callbacks}
        dialog={dialog}
      />
    </>
  );
}

export default memo(ChatWrapper);
