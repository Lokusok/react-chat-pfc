import { memo, useEffect, useRef } from 'react';

import Chat from '../../components/chat';

import ApiService from '../../../../api/api-service';
import { TProduct } from '../../store/products/types';

import { useProductsStore, useChatStore, useSnackbarsStore } from '../../store';

import buildPhrase from '../../utils/build-phrase';
import buildBotMessage from '../../utils/build-bot-message';

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

        // const botMessage = buildBotMessage(productItem);
        // @todo заменить на верхнюю
        const botMessage = buildBotMessage({
          id: 'qwerty',
          title: 'Петрушка',
          description:
            'Таким образом дальнейшее развитие различных форм деятельности обеспечивает широкому кругу (специалистов) участие в формировании системы обучения кадров, соответствует насущным потребностям. Идейные соображения высшего порядка.',
          image:
            'https://medseen.ru/wp-content/uploads/2023/10/scale_1200.jpeg',
        });
        chatStore.addMessage(botMessage);

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

  // will remove on later stages
  console.log({ waiting: chatStore.waiting });

  useEffect(() => {
    console.log('messages:', chatStore.messages);
  }, [chatStore.messages]);

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
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
              <button className="btn">Закрыть</button>
            </form>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>Закрыть</button>
        </form>
      </dialog>
    </>
  );
}

export default memo(ChatWrapper);
