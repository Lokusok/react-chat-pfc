import { memo } from 'react';

type TProductPreviewProps = {
  imageName: string;
  alt?: string;
};

function ProductPreview({ imageName, alt }: TProductPreviewProps) {
  return (
    <picture>
      <source srcSet={`/images/${imageName}.avif`} type="image/avif" />
      <source srcSet={`/images/${imageName}.webp`} type="image/webp" />
      <img
        className="w-[100%] h-[200px] object-cover"
        src={`/images/${imageName}.jpg`}
        alt={alt}
      />
    </picture>
  );
}

export default memo(ProductPreview);
