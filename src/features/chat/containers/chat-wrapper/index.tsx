import { memo, useRef } from 'react';

import Chat from '../../components/chat';

import ApiService from '../../../../api/api-service';
import { TProduct } from '../../store/products/types';

import { useProductsStore, useChatStore } from '../../store';
import buildPhrase from '../utils/build-phrase';

function ChatWrapper() {
  const modalInfoRef = useRef<HTMLDialogElement>(null);

  const productsStore = useProductsStore();
  const chatStore = useChatStore();

  const helpers = {
    fetchProduct: async (product: TProducts, aLot = false) => {
      try {
        chatStore.setWaiting(true);
        chatStore.setWaitingProduct(product);

        const text = buildPhrase({ product, aLot });
        chatStore.addMessage({ from: 'user', text });

        await new Promise((res) => setTimeout(res, 1000));
        const productItem = await ApiService.getProduct({
          product,
          aLot,
        });

        chatStore.addMessage({
          from: 'bot',
          // productItem.name
          text: 'Нашёл продукт! Думаю, вам подойдёт - Петрушка.',
          image:
            // productItem.preview
            'https://medseen.ru/wp-content/uploads/2023/10/scale_1200.jpeg',
        });

        return productItem;
      } finally {
        chatStore.setWaiting(false);
        chatStore.setWaitingProduct(null);
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

  const handlers = {
    onMoreBtnClick: (product: TProduct) => {
      if (!modalInfoRef.current) return;
      productsStore.setActiveProduct(product);
      modalInfoRef.current.showModal();
    },
  };

  console.log({ waiting: chatStore.waiting });

  return (
    <>
      <Chat
        loadingProduct={chatStore.waitingProduct}
        loading={chatStore.waiting}
        callbacks={callbacks}
        dialog={chatStore.messages}
        onMoreBtnClick={handlers.onMoreBtnClick}
      />

      <dialog
        ref={modalInfoRef}
        id="info-product-modal"
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box">
          <h3 className="font-bold text-[30px] text-center mb-2">
            {productsStore.activeProduct?.title}: описание
          </h3>
          <div className="flex justify-center">
            <div className="max-w-[300px] rounded-lg overflow-hidden">
              <img
                src={productsStore.activeProduct?.image}
                alt={productsStore.activeProduct?.title}
              />
            </div>
          </div>
          <p className="py-4">{productsStore.activeProduct?.description}</p>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Закрыть</button>
            </form>
          </div>
        </div>
        <label className="modal-backdrop" htmlFor="info-product-modal">
          Close
        </label>
      </dialog>
    </>
  );
}

export default memo(ChatWrapper);
