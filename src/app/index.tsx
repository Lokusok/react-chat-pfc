import { memo } from 'react';
import ChatWrapper from '../features/chat/containers/chat-wrapper';

function App() {
  return (
    <div className="max-w-[720px] mx-auto flex flex-col grow justify-center">
      <ChatWrapper />
    </div>
  );
}

export default memo(App);
