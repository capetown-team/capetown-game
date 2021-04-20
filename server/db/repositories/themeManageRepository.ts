/* eslint-disable @typescript-eslint/no-explicit-any */
import { Sequelize, ModelCtor, Model } from 'sequelize-typescript';

export const themeManageRepository = (
  sequelize: Sequelize,
  Theme: ModelCtor<Model<any, any>>
) => {
  const add = (name: string, data: string, hidden = false) => {
    return Theme.create({ name, data, hidden });
  };

  const view = (id: number, view: boolean) => {
    return Theme.update({ view }, { where: { id } });
  };

  const change = (id: number, data: string) => {
    return Theme.update({ data }, { where: { id } });
  };

  return {
    add,
    view,
    change
  };
};
