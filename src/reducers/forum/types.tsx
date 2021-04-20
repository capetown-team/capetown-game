export type ForumState = {
  topics: TopicProps[];
  comments: {comments: messageTableProps};
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

export type MessageTableProps = {
  topic: TopicProps,
  messages: CommentProps[];
};

export type TopicTableProps = {
  name: string;
  content: string;
};

export type ReplyProps = {
  id: number;
  commentId: number;
  content: string;
  userId: number;
  topicId: number;
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
  replies: number;
  likes: number;
};

export type EmotionProps = {
  userId: number;
  commentId: number;
  topicId: number;
};
