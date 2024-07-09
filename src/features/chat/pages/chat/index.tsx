import { memo } from 'react';

import ChatWrapper from '../../containers/chat-wrapper';
import AllSnackbars from '../../containers/all-snackbars';

function ChatPage() {
  return (
    <>
      <ChatWrapper />

      <AllSnackbars />
    </>
  );
}

export default memo(ChatPage);
