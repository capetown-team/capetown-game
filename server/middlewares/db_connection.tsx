import { Sequelize, SequelizeOptions } from 'sequelize-typescript';
const { DB_USERNAME, DB_PASSWORD } = process.env;
console.log(DB_USERNAME,DB_PASSWORD);
const sequelizeOptions: SequelizeOptions = {
    host: 'localhost',
    port: 5436,
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: 'pacman',

    dialect: 'postgres', 
    define: {
    timestamps: false
  }
};

export const sequelize = new Sequelize(sequelizeOptions);
