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

export type TopicTableProps = {
  name: string;
  content: string;
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
  topicId: number;
  userid: number;
};

export type messageProps = {
  id: number;
  name: string;
  content: string;
  time: string;
  countComments: number;
  countLikes: number;
};

export type EmotionProps = {
  userId: number;
  commentId: string;
};
