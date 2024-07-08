import { memo, forwardRef } from 'react';
import { Search } from 'lucide-react';

import botImage from '../../../assets/bot-image.jpg';
import { TMessage } from '../../../store/chat/types';
import normalizeImagePathName from '../../../utils/normalize-image-path-name';
import ProductPreview from '../../product/product-preview';

type TBotMessageProps = {
  message: TMessage;
  onMoreBtnClick: () => void;
};

function BotMessage(
  { message, onMoreBtnClick }: TBotMessageProps,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  return (
    <div ref={ref} data-bot={true} key={message.id} className="chat chat-start">
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img alt="" role="presentation" aria-hidden="true" src={botImage} />
        </div>
      </div>
      <div className="chat-bubble">
        {Boolean(message.image) && (
          <div className="rounded-lg overflow-hidden mb-[15px] max-w-[100%] relative">
            <ProductPreview
              imageName={normalizeImagePathName(message.product!.title)}
              alt={message.product!.title}
            />

            {Boolean(onMoreBtnClick) && (
              <div
                onClick={onMoreBtnClick}
                className="absolute top-[7.5px] right-[7.5px] btn btn-sm btn-circle"
              >
                <div className="tooltip tooltip-left" data-tip="Подробнее">
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
  );
}

export default memo(forwardRef(BotMessage));
