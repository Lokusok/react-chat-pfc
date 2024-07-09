import { memo, useEffect, useRef, useState } from 'react';
import { ListRange, Virtuoso, VirtuosoHandle } from 'react-virtuoso';

import Actions from './chat-actions';

import { TProduct } from '../../store/products/types';
import { TMessage } from '../../store/chat/types';

import ScrollDownBtn from './scroll-down-btn';
import BotMessage from '../messages/bot-message';
import UserMessage from '../messages/user-message';
import TrashBtn from './trash-btn';

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
  onDeleteBtnClick?: () => void;
  isDeleteBtnActive?: boolean;
};

function Chat(props: TChatProps) {
  const {
    loading,
    loadingProduct,
    onMoreBtnClick,
    onDeleteBtnClick,
    isDeleteBtnActive,
    dialog,
    callbacks,
    showLargeDefault = false,
  } = props;

  const [showLarge, setShowLarge] = useState(showLargeDefault);
  const [isScrollDownVisible, setIsScrollDownVisible] = useState(true);

  const chatBoxRef = useRef<HTMLDivElement>(null);
  const virtuosoRef = useRef<VirtuosoHandle>(null);

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
      if (!virtuosoRef.current) return;

      virtuosoRef.current.scrollToIndex({
        index: dialog.length - 1,
        behavior: 'smooth',
      });
    },
    onVirtuosoRangeChanged: (range: ListRange) => {
      setIsScrollDownVisible(range.endIndex !== dialog.length - 1);
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

  useEffect(() => {
    if (!virtuosoRef.current) return;

    const virtuosoHandleInstance = virtuosoRef.current;

    window.requestAnimationFrame(() => {
      virtuosoHandleInstance.scrollToIndex({
        index: dialog.length - 1,
        behavior: 'smooth',
        align: 'end',
      });
    });
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

        {Boolean(onDeleteBtnClick) && (
          <TrashBtn
            onClick={onDeleteBtnClick}
            disabled={isDeleteBtnActive}
            className="absolute -left-[55px] top-[75px]"
            tooltipText="Очистить?"
          />
        )}

        {dialog.length > 3 && (
          <div className="bg-neutral w-[100%] rounded-[6px] z-[100] absolute pointer-events-none top-[70px] flex h-[35px] [mask-image:linear-gradient(#000000,transparent)]"></div>
        )}

        <Virtuoso
          rangeChanged={handlers.onVirtuosoRangeChanged}
          ref={virtuosoRef}
          followOutput="smooth"
          style={{
            width: 520,
            height: dialog.length > 2 ? 370 : 170,
            transition: 'height ease 0.3s',
            willChange: 'height',
            maxHeight: 370,
          }}
          className="relative max-h-[370px] border-r-[transparent] border-r-[2px] overflow-y-auto scrollbar-thin scrollbar-thumb-rounded-full scrollbar-thumb-[#00c530] scrollbar-track-[rgba(0,0,0,0.1)]"
          data={dialog}
          initialTopMostItemIndex={dialog.length - 1}
          itemContent={(_, message) => {
            return message.from === 'bot' ? (
              <div className="pl-3">
                <BotMessage
                  message={message}
                  onMoreBtnClick={() => handlers.onMoreBtnClick(message)}
                />
              </div>
            ) : (
              <div className="pr-3">
                <UserMessage message={message} />
              </div>
            );
          }}
        />
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

export default memo(Chat);
