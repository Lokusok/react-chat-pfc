import { memo } from 'react';

import ChatPage from '../features/chat/pages/chat';

function App() {
  return (
    <div className="max-w-[720px] mx-auto flex flex-col grow justify-center">
      <ChatPage />
    </div>
  );
}

export default memo(App);
