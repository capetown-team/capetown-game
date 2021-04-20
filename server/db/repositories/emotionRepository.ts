import { ModelCtor, Model } from 'sequelize-typescript';

export const emotionRepository = (Emotion: ModelCtor<Model<any, any>>) => {
  const getAll = () => {
    return Emotion.findAll({
    });
  };

  const add = (userId: number, commentId: number) => {
    return Emotion.create({ userId, commentId });
  };

  return {
    getAll,
    add
  };
};
