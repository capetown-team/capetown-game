export type ForumState = {
  topics: TopicProps[];
  comments: CommentProps[];
  replies: ReplyProps[];
  emotions: EmotionProps[];
  isSuccessResult: boolean;
  pending: boolean;
  error: boolean | null;
};

export type TopicProps = {
  id: number;
  name: string;
  message: number;
};

export type ReplyProps = {
  id: number;
  name: string;
  content: string;
  userid: number;
};

export type CommentProps = {
  id: number;
  name: string;
  content: string;
  userid: number;
};

export type EmotionProps = {
  userId: number;
  commentId: string;
};
