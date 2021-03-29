import { Sequelize, SequelizeOptions } from 'sequelize-typescript';

const sequelizeOptions: SequelizeOptions = {
    host: 'localhost',
    port: 5432,
    username: 'admin',
    password: 'admin',
    database: 'pacman',

    dialect: 'postgres' // 'mysql', 'sqlite', 'mariadb', 'mssql'
};

export const sequelize = new Sequelize(sequelizeOptions);
