import { Model, ModelCtor } from 'sequelize-typescript';

export type ReplyType = {
  id: number;
  content: string;
  commentId: number;
  userId: number;
};

export const replyRepository = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Reply: ModelCtor<Model<any, any>>
) => {
  const getAll = (commentId: number) => {
    return Reply.findAll({ where: { commentId } });
  };

  const add = (content: string, commentId: number, userId: number) => {
    return Reply.create({
      timeMessage: new Date(),
      content,
      commentId,
      userId
    });
  };

  return {
    getAll,
    add
  };
};
