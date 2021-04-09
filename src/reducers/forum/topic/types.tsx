export type ForumState = {
  topics: Props[];
  isSuccessResult: boolean;
  pending: boolean;
  error: boolean | null;
};

export type Props = {
  id: number;
  name: string;
  message: number;
};
