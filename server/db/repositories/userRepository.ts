import { ModelCtor, Model } from 'sequelize-typescript';

export const userRepository = (User: ModelCtor<Model<any, any>>) => {
  const getAll = () => {
    return User.findAll();
  };

  const add = (userData) => {
    const findUser = User.findOne({ where: { id: userData.id } }).then(
      (findUser) => {
        if (findUser == null) {
          console.log('userData1', userData);
          return User.create({ ...userData });
        } else {
          console.log('2');
          User.update(userData, { where: { id: userData.id } }).then((result) =>
            console.log('result', result)
          )
          .catch( (err) => console.log('updateerr', err));
        }
      }
    )
    .catch((err) => console.log('finderr', err));

    return User.findOne({ where: { id: userData.id } });
  };

  return {
    getAll,
    add
  };
};
