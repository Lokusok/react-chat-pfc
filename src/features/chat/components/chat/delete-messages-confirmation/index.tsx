import { memo } from 'react';

function DeleteMessagesConfirmation() {
  return (
    <>
      <h3 className="font-bold text-lg">Подтвердите удаление</h3>
      <p className="py-4">
        Нажимая "Подтвердить", Вы соглашаетесь с{' '}
        <b>полным удалением истории диалога</b> с ботом.
      </p>
    </>
  );
}

export default memo(DeleteMessagesConfirmation);
