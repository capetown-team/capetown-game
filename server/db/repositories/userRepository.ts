import { ModelCtor, Model } from 'sequelize-typescript';

export const userRepository = (User: ModelCtor<Model<any, any>>) => {
  const getAll = () => {
    return User.findAll();
  };

  const add = (userData) => {
    console.log('userData', userData);
    return User.create({ ...userData });
  };

  return {
    getAll,
    add
  };
};
