import { memo, useEffect, useLayoutEffect, useRef, useState } from 'react';

import Actions from '../chat-actions';

import { TProduct } from '../../store/products/types';
import { TMessage } from '../../store/chat/types';
import ScrollDownBtn from '../scroll-down-btn';
import BotMessage from '../bot-message';
import UserMessage from '../user-message';

type TChatProps = {
  loadingProduct?: TProducts | null;
  loading?: boolean;
  dialog: TMessage[];
  showLargeDefault?: boolean;
  callbacks: {
    getLargeCarbohydrates: () => void;
    getLargeFats: () => void;
    getLargeProteins: () => void;
    getSmallCarbohydrates: () => void;
    getSmallFats: () => void;
    getSmallProteins: () => void;
    getBalanced: () => void;
  };
  onMoreBtnClick?: (product: TProduct) => void;
};

function Chat(props: TChatProps) {
  const {
    loading,
    loadingProduct,
    onMoreBtnClick,
    dialog,
    callbacks,
    showLargeDefault = false,
  } = props;

  const [showLarge, setShowLarge] = useState(showLargeDefault);
  const [isScrollDownVisible, setIsScrollDownVisible] = useState(false);

  const dialogBoxRef = useRef<HTMLDivElement>(null);
  const chatBoxRef = useRef<HTMLDivElement>(null);
  const lastMessageRef = useRef<HTMLDivElement>(null);

  const options = {
    disabledActions: loading,
  };

  const handlers = {
    onTogglerChange: (val: boolean) => {
      setShowLarge(val);
    },

    onMoreBtnClick: (message: TMessage) => {
      if (!onMoreBtnClick || !message.product) return;
      onMoreBtnClick?.(message.product);
    },

    onScrollDownBtnClick: () => {
      if (!dialogBoxRef.current) return;

      dialogBoxRef.current.scrollTo({
        top: dialogBoxRef.current.scrollHeight,
        behavior: 'smooth',
      });
    },
  };

  const renders = {
    largeEntities: () => (
      <>
        <button
          onClick={callbacks.getLargeCarbohydrates}
          disabled={options.disabledActions}
          className="btn btn-outline"
          data-testid="action-a-lot-carbohydrates"
        >
          {loadingProduct === 'carbohydrates' && (
            <span className="loading loading-spinner"></span>
          )}
          Много углеводов
        </button>
        <button
          onClick={callbacks.getLargeFats}
          disabled={options.disabledActions}
          className="btn btn-outline"
          data-testid="action-a-lot-fats"
        >
          {loadingProduct === 'fats' && (
            <span className="loading loading-spinner"></span>
          )}
          Много жиров
        </button>
        <button
          onClick={callbacks.getLargeProteins}
          disabled={options.disabledActions}
          className="btn btn-outline"
          data-testid="action-a-lot-proteins"
        >
          {loadingProduct === 'proteins' && (
            <span className="loading loading-spinner"></span>
          )}
          Много белков
        </button>
      </>
    ),
    smallEntities: () => (
      <>
        <button
          onClick={callbacks.getSmallCarbohydrates}
          disabled={options.disabledActions}
          className="btn btn-outline"
          data-testid="action-a-small-carbohydrates"
        >
          {loadingProduct === 'carbohydrates' && (
            <span className="loading loading-spinner"></span>
          )}
          Мало углеводов
        </button>
        <button
          onClick={callbacks.getSmallFats}
          disabled={options.disabledActions}
          className="btn btn-outline"
          data-testid="action-a-small-fats"
        >
          {loadingProduct === 'fats' && (
            <span className="loading loading-spinner"></span>
          )}
          Мало жиров
        </button>
        <button
          onClick={callbacks.getSmallProteins}
          disabled={options.disabledActions}
          className="btn btn-outline"
          data-testid="action-a-small-proteins"
        >
          {loadingProduct === 'proteins' && (
            <span className="loading loading-spinner"></span>
          )}
          Мало белков
        </button>
      </>
    ),
    additionalEntities: () => (
      <>
        <button
          onClick={callbacks.getBalanced}
          disabled={options.disabledActions}
          className="btn"
        >
          {loadingProduct === 'balanced' && (
            <span className="loading loading-spinner"></span>
          )}
          Сбалансированное
        </button>
      </>
    ),
    divider: () => <div className="divider">Кнопки</div>,
  };

  useLayoutEffect(() => {
    if (!dialogBoxRef.current) return;
    const dialogBoxNode = dialogBoxRef.current;

    dialogBoxNode.scrollTo({
      top: dialogBoxNode.scrollHeight,
      behavior: 'smooth',
    });
  }, [dialog]);

  useEffect(() => {
    if (!lastMessageRef.current || !chatBoxRef.current) return;

    const chatBoxNode = chatBoxRef.current;
    const lastMessageNode = lastMessageRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsScrollDownVisible(!entry.isIntersecting);
        });
      },
      {
        root: chatBoxNode,
      }
    );

    observer.observe(lastMessageNode);

    return () => {
      observer.unobserve(lastMessageNode);
    };
  }, [dialog]);

  return (
    <div ref={chatBoxRef}>
      <div className="py-2 max-w-[520px] relative">
        <div className="mb-[15px]">
          <h1 className="text-5xl text-center font-bold">Чат БЖУ</h1>
        </div>

        {isScrollDownVisible && (
          <ScrollDownBtn
            onClick={handlers.onScrollDownBtnClick}
            className="absolute right-[15px] bottom-[15px] z-10"
          />
        )}

        <div
          ref={dialogBoxRef}
          className="relative max-h-[370px] px-3 overflow-y-auto scrollbar-thin scrollbar-thumb-rounded-full scrollbar-thumb-[#00c530] scrollbar-track-[rgba(0,0,0,0.1)]"
        >
          {dialog.map((message) =>
            message.from === 'bot' ? (
              <BotMessage
                key={message.id}
                ref={lastMessageRef}
                message={message}
                onMoreBtnClick={() => handlers.onMoreBtnClick(message)}
              />
            ) : (
              <UserMessage key={message.id} message={message} />
            )
          )}
        </div>
      </div>

      <div className="pb-2">
        <Actions
          showLarge={showLarge}
          renderLargeEntities={renders.largeEntities}
          renderSmallEntities={renders.smallEntities}
          renderAdditional={renders.additionalEntities}
          renderDivider={renders.divider}
          onTogglerChange={handlers.onTogglerChange}
        />
      </div>
    </div>
  );
}

// scrollbar-color: #00c530 #252525;

export default memo(Chat);
