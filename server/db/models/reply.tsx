import { DataType } from 'sequelize-typescript';

export const Reply = {
  id: {
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  content: {
    type: DataType.STRING,
    allowNull: false
  },
  commentId: {
    type: DataType.INTEGER,
    allowNull: false
  },
  userId: {
    type: DataType.INTEGER,
    allowNull: false
  }
};
