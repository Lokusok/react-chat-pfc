export type TDialogMessage = {
  id: string;
  from: 'bot' | 'user';
  text: string;
  image?: string;
};
