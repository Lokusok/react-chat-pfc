import { create } from 'zustand';

import { TInitProductsState, TProduct } from './types';

export const useProductsStore = create<TInitProductsState>((set) => ({
  activeProduct: null,

  setActiveProduct: (product: TProduct) => {
    set((state) => ({
      ...state,
      activeProduct: product,
    }));
  },
}));
