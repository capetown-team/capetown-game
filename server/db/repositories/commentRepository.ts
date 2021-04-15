import { Model, ModelCtor } from 'sequelize-typescript';

export type CommentType = {
  id: number;
  content: string;
  topicId: number;
  userId: number;
};

export const commentRepository = (Comment: ModelCtor<Model<any, any>>) => {
  const getAll = (topicId: number) => {
    return Comment.findAll({
      attributes: ['id', 'content'],
      where: { topicId }
    });
  };

  const add = (content: string, topicId: number, userId: number) => {
    return Comment.create({ content, topicId, userId });
  };

  return {
    getAll,
    add
  };
};
