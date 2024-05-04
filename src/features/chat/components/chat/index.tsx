import { memo, useEffect, useRef, useState } from 'react';
import { Search } from 'lucide-react';

import Actions from '../chat-actions';

import botImage from '../../assets/bot-image.jpg';
import userImage from '../../assets/user-image.jpg';

import { TProduct } from '../../store/products/types';
import { TMessage } from '../../store/chat/types';

type TChatProps = {
  loadingProduct?: TProducts | null;
  loading?: boolean;
  dialog: TMessage[];
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
  const { loading, loadingProduct, onMoreBtnClick, dialog, callbacks } = props;

  const [showLarge, setShowLarge] = useState(false);

  const dialogBoxRef = useRef<HTMLDivElement>(null);
  const chatBoxRef = useRef<HTMLDivElement>(null);

  const options = {
    disabledActions: loading,
  };

  const renders = {
    largeEntities: () => (
      <>
        <button
          onClick={callbacks.getLargeCarbohydrates}
          disabled={options.disabledActions}
          className="btn btn-outline"
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

  const handlers = {
    onTogglerChange: (val: boolean) => {
      setShowLarge(val);
    },

    onMoreBtnClick: (message: TMessage) => {
      if (!onMoreBtnClick || !message.product) return;
      onMoreBtnClick?.(message.product);
    },
  };

  useEffect(() => {
    // Иначе может сломаться скролл
    window.requestIdleCallback(() => {
      if (!dialogBoxRef.current) return;
      dialogBoxRef.current.scrollTo({
        top: dialogBoxRef.current.scrollHeight,
        behavior: 'smooth',
      });
    });
  }, [dialog]);

  useEffect(() => {
    if (!chatBoxRef.current) return;
    let initialHeight: number | null = null;

    const resizeObserver = new ResizeObserver((entries) => {
      if (!chatBoxRef.current) return;

      for (const entry of entries) {
        if (!initialHeight) {
          initialHeight = entry.contentRect.height;
          return;
        }

        const newHeight = entry.contentRect.height;
        if (newHeight > initialHeight) {
          chatBoxRef.current.style.marginTop = 40 + 'px';
        }
      }
    });

    resizeObserver.observe(chatBoxRef.current);

    return () => resizeObserver.disconnect();
  }, []);

  return (
    <div ref={chatBoxRef}>
      <div className="py-2 max-w-[520px]">
        <div className="mb-[15px]">
          <h1 className="text-5xl text-center font-bold">Чат БЖУ</h1>
        </div>

        <div
          ref={dialogBoxRef}
          className="max-h-[370px] px-3 overflow-y-auto scrollbar-thin scrollbar-thumb-rounded-full scrollbar-thumb-[#00c530] scrollbar-track-[rgba(0,0,0,0.1)]"
        >
          {dialog.map((message) =>
            message.from === 'bot' ? (
              <div key={message.id} className="chat chat-start ">
                <div className="chat-image avatar">
                  <div className="w-10 rounded-full">
                    <img
                      alt=""
                      role="presentation"
                      aria-hidden="true"
                      src={botImage}
                    />
                  </div>
                </div>
                <div className="chat-bubble">
                  {Boolean(message.image) && (
                    <div className="rounded-lg overflow-hidden mb-[15px] max-w-[300px] relative">
                      <img
                        className="w-[100%] h-[100%] object-cover"
                        src={message.image}
                        alt={message.text.split(' ').slice(0, 4).join(' ')}
                      />
                      {Boolean(onMoreBtnClick) && (
                        <div
                          onClick={() => handlers.onMoreBtnClick(message)}
                          className="absolute top-[7.5px] right-[7.5px] btn btn-sm btn-circle"
                        >
                          <div
                            className="tooltip tooltip-left"
                            data-tip="Подробнее"
                          >
                            <button>
                              <Search style={{ zIndex: -1 }} />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                  <div>{message.text}</div>
                </div>
              </div>
            ) : (
              <div key={message.id} className="chat chat-end">
                <div className="chat-image avatar">
                  <div className="w-10 rounded-full">
                    <img
                      alt=""
                      role="presentation"
                      aria-hidden="true"
                      src={userImage}
                    />
                  </div>
                </div>
                <div className="chat-bubble">{message.text}</div>
              </div>
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
