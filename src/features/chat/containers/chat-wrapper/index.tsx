import { memo, useRef } from 'react';

import Chat from '../../components/chat';

import ApiService from '../../../../api/api-service';
import { TProduct } from '../../store/products/types';

import { useProductsStore, useChatStore, useSnackbarsStore } from '../../store';

import buildPhrase from '../../utils/build-phrase';
import buildBotMessage from '../../utils/build-bot-message';
import Modal from '../../components/modal';

function ChatWrapper() {
  const modalInfoRef = useRef<HTMLDialogElement>(null);

  const productsStore = useProductsStore();
  const chatStore = useChatStore();
  const snackbarsStore = useSnackbarsStore();

  const helpers = {
    fetchProduct: async (product: TProducts, aLot = false) => {
      try {
        chatStore.setWaiting(true);
        chatStore.setWaitingProduct(product);

        const text = buildPhrase({ product, aLot });
        chatStore.addMessage({ from: 'user', text, type: 'default' });

        await new Promise((res) => setTimeout(res, 1000));
        const productItem = await ApiService.getProduct({
          product,
          aLot,
        });

        if (productItem.error) {
          return snackbarsStore.setErrorSnack({
            buttonText: 'Понятно',
            bodyText: productItem.error,
            timeout: 3000,
          });
        }

        const botMessage = buildBotMessage(productItem);
        chatStore.addMessage(botMessage);

        return productItem;
      } finally {
        chatStore.setWaiting(false);
        chatStore.setWaitingProduct(null);
      }
    },
  };

  const callbacks = {
    getLargeCarbohydrates: () => {
      helpers.fetchProduct('carbohydrates', true);
    },
    getLargeFats: () => {
      helpers.fetchProduct('fats', true);
    },
    getLargeProteins: () => {
      helpers.fetchProduct('proteins', true);
    },

    getSmallCarbohydrates: () => {
      helpers.fetchProduct('carbohydrates', false);
    },
    getSmallFats: () => {
      helpers.fetchProduct('fats', false);
    },
    getSmallProteins: () => {
      helpers.fetchProduct('proteins', false);
    },

    getBalanced: () => {
      helpers.fetchProduct('balanced');
    },
  };

  const handlers = {
    onMoreBtnClick: (product: TProduct) => {
      if (!modalInfoRef.current) return;
      productsStore.setActiveProduct(product);
      modalInfoRef.current.showModal();
    },
  };

  return (
    <>
      <Chat
        loadingProduct={chatStore.waitingProduct}
        loading={chatStore.waiting}
        callbacks={callbacks}
        dialog={chatStore.messages}
        onMoreBtnClick={handlers.onMoreBtnClick}
      />

      <Modal activeProduct={productsStore.activeProduct!} ref={modalInfoRef} />
    </>
  );
}

export default memo(ChatWrapper);
