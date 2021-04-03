import { Sequelize, SequelizeOptions } from 'sequelize-typescript';
import dotenv from 'dotenv';

import { User } from '../db/models/user';
import { Topic } from '../db/models/topic';
import { Comment } from '../db/models/comment';
import { Reply } from '../db/models/reply';
import { Theme } from '../db/models/theme';
import { UserTheme } from '../db/models/userTheme';

dotenv.config();
const { DB_USERNAME, DB_PASSWORD, DB_HOST, DB_PORT } = process.env;

const sequelizeOptions: SequelizeOptions = {
    host: DB_HOST,
    port: Number(DB_PORT),
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: 'pacman',

    dialect: 'postgres', 
    define: {
    timestamps: false
  }
};

export const sequelize = new Sequelize(sequelizeOptions);
sequelize.addModels([User, Topic, Comment, Reply, Theme, UserTheme]);
