export type TProduct = {
  title: string;
  description: string;
  image: string;
};

export type TProductsState = {
  activeProduct: TProduct | null;
  setActiveProduct: (product: TProduct) => void;
};
