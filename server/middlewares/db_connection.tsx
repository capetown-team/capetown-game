import { Sequelize, SequelizeOptions } from 'sequelize-typescript';

const sequelizeOptions: SequelizeOptions = {
    host: 'localhost',
    port: 5436,
    username: 'admin',
    password: 'admin',
    database: 'pacman',

    dialect: 'postgres', // 'mysql', 'sqlite', 'mariadb', 'mssql'
    define: {
    timestamps: false
  }
};

export const sequelize = new Sequelize(sequelizeOptions);
