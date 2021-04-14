import { Sequelize, SequelizeOptions } from 'sequelize-typescript';
import dotenv from 'dotenv';

dotenv.config();
const { DB_USERNAME, DB_PASSWORD, DB_HOST, DB_PORT } = process.env;

const sequelizeOptions: SequelizeOptions = {
  host: DB_HOST,
  port: Number(DB_PORT),
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: 'pacman',

  dialect: 'postgres',
  quoteIdentifiers: false,
  define: {
    timestamps: false
  }
};

export const sequelize = new Sequelize(sequelizeOptions);
