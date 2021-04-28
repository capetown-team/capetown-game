/* eslint-disable @typescript-eslint/no-explicit-any */
import { Sequelize, ModelCtor, Model } from 'sequelize-typescript';

export const themeRepository = (
  sequelize: Sequelize,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Theme: ModelCtor<Model<any, any>>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  UserTheme: ModelCtor<Model<any, any>>
) => {
  const getAll = () => {
    return Theme.findAll({
      attributes: ['id', 'name'],
      where: { hidden: false }
    });
  };

  const add = (userId: number, themeId: number) => {
    return UserTheme.create({ userId, themeId });
  };

  const change = (userId: number, themeId: number) => {
    return UserTheme.update({ themeId }, { where: { userId } });
  };

  const get = (userId: number) => {
    return UserTheme.findOne({
      attributes: [],
      where: { userId },
      include: [
        {
          model: Theme,
          attributes: ['id', 'data']
        }
      ]
    });
  };

  return {
    getAll,
    add,
    get,
    change
  };
};
