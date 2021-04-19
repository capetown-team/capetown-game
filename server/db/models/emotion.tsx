import { DataType } from 'sequelize-typescript';

export const Emotion = {
  id: {
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  userId: {
    type: DataType.INTEGER,
    allowNull: false
  },
  commentId: {
    type: DataType.INTEGER,
    allowNull: false
  }
};
