import { Sequelize, SequelizeOptions } from 'sequelize-typescript';
import dotenv from 'dotenv';

dotenv.config();
const { DB_USERNAME, DB_PASSWORD } = process.env;

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
