import { ModelCtor, Model } from 'sequelize-typescript';

export const emotionRepository = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Emotion: ModelCtor<Model<any, any>>
) => {
  const getAll = () => {
    return Emotion.findAll({});
  };

  const add = (userId: number, commentId: number) => {
    Emotion.findOne({ where: { userId, commentId } })
      .then((findEmotion) => {
        if (findEmotion == null) {
          Emotion.create({ userId, commentId });
        }
      })
      // eslint-disable-next-line no-console
      .catch((err) => console.log('err', err));

    return Emotion.findOne({ where: { userId, commentId } });
  };

  return {
    getAll,
    add
  };
};
