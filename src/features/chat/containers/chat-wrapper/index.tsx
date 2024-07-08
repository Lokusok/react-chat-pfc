import { memo, useRef } from 'react';

import Chat from '../../components/chat';

import ApiService from '../../../../api/api-service';
import { TProduct } from '../../store/products/types';

import { useProductsStore, useChatStore, useSnackbarsStore } from '../../store';

import buildPhrase from '../../utils/build-phrase';
import buildBotMessage from '../../utils/build-bot-message';
import Modal from '../../layouts/modal';
import ProductInfo from '../../components/product/product-info';
import DeleteMessagesConfirmation from '../../components/chat/delete-messages-confirmation';

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
    onDeleteBtnClick: () => {
      chatStore.resetMessages();
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
        onDeleteBtnClick={handlers.onDeleteBtnClick}
        isDeleteBtnActive={chatStore.messages.length <= 2}
      />

      <Modal modalId="info-product-modal" ref={modalInfoRef}>
        <ProductInfo activeProduct={productsStore.activeProduct} />
      </Modal>

      {/* For test purposes only */}
      <button
        className="btn"
        onClick={() =>
          document
            .getElementById('confirmation-delete-messages-modal')
            .showModal()
        }
      >
        open modal
      </button>
      <Modal
        modalId="confirmation-delete-messages-modal"
        renderActions={() => (
          <>
            <div className="modal-action flex gap-x-[10px]">
              <form method="dialog">
                <button className="btn">Отмена</button>
              </form>

              <button className="btn glass">Подтвердить</button>
            </div>
          </>
        )}
      >
        <DeleteMessagesConfirmation />
      </Modal>
    </>
  );
}

export default memo(ChatWrapper);
