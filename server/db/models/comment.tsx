import { DataType } from 'sequelize-typescript';

export const Comment = {
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
  topicId: {
    type: DataType.INTEGER,
    allowNull: false
  },
  userId: {
    type: DataType.INTEGER,
    allowNull: false
  },
  timeMessage: {
    type: DataType.DATE,
    allowNull: true
  }
};
