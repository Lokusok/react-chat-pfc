import { memo, useLayoutEffect, useRef, useState } from 'react';
import { Search } from 'lucide-react';

import botImage from '../../assets/bot-image.jpg';
import userImage from '../../assets/user-image.jpg';
import Actions from '../chat-actions';

import { TDialogMessage } from '../../types';
import { TProduct } from '../../store/products/types';

type TChatProps = {
  loadingProduct?: TProducts | null;
  loading?: boolean;
  dialog: TDialogMessage[];
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

    onMoreBtnClick: () => {
      if (!onMoreBtnClick) return;

      const product: TProduct = {
        title: 'Петрушка',
        description:
          'Таким образом дальнейшее развитие различных форм деятельности обеспечивает широкому кругу (специалистов) участие в формировании системы обучения кадров, соответствует насущным потребностям. Идейные соображения высшего порядка.',
        image: 'https://medseen.ru/wp-content/uploads/2023/10/scale_1200.jpeg',
      };
      onMoreBtnClick?.(product);
    },
  };

  useLayoutEffect(() => {
    const animationFrame = window.requestAnimationFrame(() => {
      if (!dialogBoxRef.current) return;
      dialogBoxRef.current.scrollTo({
        top: dialogBoxRef.current.scrollHeight,
        behavior: 'smooth',
      });
    });

    return () => window.cancelAnimationFrame(animationFrame);
  }, [dialog]);

  return (
    <>
      <div className="py-2 max-w-[520px]">
        <div className="mb-[15px]">
          <h1 className="text-5xl text-center font-bold">Чат БЖУ</h1>
        </div>

        <div
          ref={dialogBoxRef}
          className="max-h-[370px] px-3 overflow-y-auto scrollbar scrollbar-thin scrollbar-thumb-rounded-full scrollbar-thumb-[#00c530] scrollbar-track-[#252525]"
        >
          {dialog.map((message) =>
            message.from === 'bot' ? (
              <div key={message.id} className="chat chat-start ">
                <div className="chat-image avatar">
                  <div className="w-10 rounded-full">
                    <img
                      alt="Tailwind CSS chat bubble component"
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
                        <div className="absolute top-[7.5px] right-[7.5px] btn btn-sm btn-circle">
                          <div
                            className="tooltip tooltip-left"
                            data-tip="Подробнее"
                          >
                            <button onClick={handlers.onMoreBtnClick}>
                              <Search />
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
                      alt="Tailwind CSS chat bubble component"
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
    </>
  );
}

// scrollbar-color: #00c530 #252525;

export default memo(Chat);
