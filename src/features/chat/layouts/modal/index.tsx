import React, { memo, forwardRef } from 'react';

type TModalProps = {
  children: React.ReactNode;
  modalId: string;
  renderActions?: () => React.ReactNode;
};

function Modal(
  { children, modalId, renderActions }: TModalProps,
  ref: React.ForwardedRef<HTMLDialogElement>
) {
  return (
    <dialog
      ref={ref}
      id={modalId}
      className="modal modal-bottom sm:modal-middle"
    >
      <div className="modal-box scrollbar-thin scrollbar-thumb-rounded-full scrollbar-thumb-[#00c530] scrollbar-track-[rgba(0,0,0,0.1)]">
        {children}

        <div className="modal-action">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-5 top-5">
              ✕
            </button>

            {!renderActions && <button className="btn">Закрыть</button>}
          </form>

          {renderActions?.()}
        </div>
      </div>

      <form method="dialog" className="modal-backdrop">
        <button>Закрыть</button>
      </form>
    </dialog>
  );
}

export default memo(forwardRef(Modal));
