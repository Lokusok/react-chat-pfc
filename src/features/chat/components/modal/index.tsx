import { memo, forwardRef } from 'react';
import { TProduct } from '../../store/products/types';

type TModalProps = {
  activeProduct: TProduct;
};

function Modal(props: TModalProps, ref: React.ForwardedRef<HTMLDialogElement>) {
  return (
    <dialog
      ref={ref}
      id="info-product-modal"
      className="modal modal-bottom sm:modal-middle"
    >
      <div className="modal-box scrollbar-thin scrollbar-thumb-rounded-full scrollbar-thumb-[#00c530] scrollbar-track-[rgba(0,0,0,0.1)]">
        <h3 className="font-bold text-[30px] text-center mb-2">
          {props.activeProduct?.title}: описание
        </h3>
        <div className="flex justify-center">
          <div className="max-w-[300px] rounded-lg overflow-hidden">
            <img
              className="h-[200px]"
              src={props.activeProduct?.image}
              alt={props.activeProduct?.title}
            />
          </div>
        </div>
        <p className="py-4">{props.activeProduct?.description}</p>
        <div className="modal-action">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-5 top-5">
              ✕
            </button>
            <button className="btn">Закрыть</button>
          </form>
        </div>
      </div>

      <form method="dialog" className="modal-backdrop">
        <button>Закрыть</button>
      </form>
    </dialog>
  );
}

export default memo(forwardRef(Modal));
