export type FeedbackType = {
  _id: string;
  name: string;
  email: string;
  text: string;
};

export type FeedbackCreateType = {
  name: string;
  email: string;
  text: string;
};

export type FeedbackState = {
  pending: boolean;
  list: FeedbackType[];
  error: boolean | null;
  isSuccessCreate: boolean;
};
