import { memo } from 'react';
import { TMessage } from '../../store/chat/types';
import userImage from '../../assets/user-image.jpg';

type TUserMessageProps = {
  message: TMessage;
};

function UserMessage({ message }: TUserMessageProps) {
  return (
    <div key={message.id} className="chat chat-end">
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img alt="" role="presentation" aria-hidden="true" src={userImage} />
        </div>
      </div>
      <div className="chat-bubble">{message.text}</div>
    </div>
  );
}

export default memo(UserMessage);
