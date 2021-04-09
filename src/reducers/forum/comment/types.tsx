export type CommentState = {
  comments: Props[];
  isSuccessResult: boolean;
  pending: boolean;
  error: boolean | null;
};

export type Props = {
  id: number;
  name: string;
  content: string;
  userid: number;
};
