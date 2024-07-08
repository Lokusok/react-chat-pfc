import normalizeImagePathName from '@/features/chat/utils/normalize-image-path-name';
import { memo } from 'react';
import ProductPreview from '../product-preview';
import { TProduct } from '@/features/chat/store/products/types';

type TProductInfoProps = {
  activeProduct?: TProduct | null;
};

function ProductInfo(props: TProductInfoProps) {
  return (
    <>
      <h3 className="font-bold text-[30px] text-center mb-2">
        {props.activeProduct && <>{props.activeProduct.title}: описание</>}
      </h3>
      <div className="flex justify-center">
        <div className="max-w-[300px] rounded-lg overflow-hidden">
          {props.activeProduct && (
            <>
              <ProductPreview
                imageName={normalizeImagePathName(props.activeProduct.title)}
                alt={props.activeProduct.title}
              />
            </>
          )}
        </div>
      </div>
      {props.activeProduct && (
        <p className="py-4">{props.activeProduct.description}</p>
      )}
    </>
  );
}

export default memo(ProductInfo);
