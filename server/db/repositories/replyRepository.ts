import { Model, ModelCtor } from 'sequelize-typescript';

export type ReplyType = {
  id: number;
  content: string;
  commentId: number;
  userId: number;
};

export const replyRepository = (Reply: ModelCtor<Model<any, any>>) => {
  const getAll = (commentId: number) => {
    return Reply.findAll({ where: { commentId } });
  };

  const add = (content: string, commentId: number, userId: number) => {
    return Reply.create({ content, commentId, userId });
  };

  return {
    getAll,
    add
  };
};
