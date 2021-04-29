import { ModelCtor, Model } from 'sequelize-typescript';

export const userRepository = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  User: ModelCtor<Model<any, any>>
) => {
  const getAll = () => {
    return User.findAll();
  };

  const add = (userData) => {
    const findUser = User.findOne({ where: { id: userData.id } })
      .then((findUser) => {
        if (findUser == null) {
          User.create({ ...userData });
        } else {
          User.update(userData, { where: { id: userData.id } })
            // eslint-disable-next-line no-console
            .then((result) => console.log('result', result))
            // eslint-disable-next-line no-console
            .catch((err) => console.log('updateerr', err));
        }
      })
      // eslint-disable-next-line no-console
      .catch((err) => console.log('finderr', err));

    return findUser;
  };

  return {
    getAll,
    add
  };
};
