// import { makeAutoObservable } from 'mobx';

// class ProductsStore {
//   constructor() {
//     makeAutoObservable(this);
//   }
// }

// const productsStore = new ProductsStore();

// export default productsStore;

import { create } from 'zustand';
import { TProduct, TProductsState } from './types';

export const useProductsStore = create<TProductsState>((set) => ({
  activeProduct: null,
  setActiveProduct: (product: TProduct) => {
    set((state) => ({
      ...state,
      activeProduct: product,
    }));
  },
}));
