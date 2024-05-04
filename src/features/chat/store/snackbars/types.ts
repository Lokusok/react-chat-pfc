export type TSnack = {
  bodyText: string;
  buttonText?: string;
  timeout?: number;
};

export type TSnackbarsState = {
  errorSnack: TSnack | null;
};

export type TSnackbarsActions = {
  setErrorSnack: (snack: TSnack | null) => void;
  resetAllSnacks: () => void;
};

export type TInitSnackbarsState = TSnackbarsState & TSnackbarsActions;
