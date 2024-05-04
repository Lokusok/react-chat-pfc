import { create } from 'zustand';

import { TInitSnackbarsState, TSnack, TSnackbarsState } from './types';

const initSnackbarsState: () => TSnackbarsState = () => ({
  errorSnack: null,
});

export const useSnackbarsStore = create<TInitSnackbarsState>((set) => ({
  ...initSnackbarsState(),
  setErrorSnack: (snack: TSnack | null) => {
    set((state) => ({
      ...state,
      errorSnack: snack,
    }));

    if (!snack?.timeout) return;

    setTimeout(() => {
      set((state) => ({
        ...state,
        errorSnack: null,
      }));
    }, snack.timeout);
  },
  resetAllSnacks: () => {
    set((state) => ({
      ...state,
      ...initSnackbarsState(),
    }));
  },
}));
