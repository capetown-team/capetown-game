import { sequelize } from './db_connection';

export const initDataBase = () => {
  return sequelize
    .sync()
    .then(() => {
      console.log('connected');
    })
    .catch((err) => console.log(err));
};
