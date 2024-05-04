export type TProduct = {
  title: string;
  description: string;
  image: string;
};

export type TProductsState = {
  activeProduct: TProduct | null;
};

export type TProductActions = {
  setActiveProduct: (product: TProduct) => void;
};

export type TInitProductsState = TProductsState & TProductActions;
