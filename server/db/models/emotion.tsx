import { DataType } from 'sequelize-typescript';

export const Emotion = {
  userId: {
    type: DataType.INTEGER,
    allowNull: false,
    references: {
      model: 'pacmanuser',
      key: 'id'
    }
  },
  commentId: {
    type: DataType.INTEGER,
    allowNull: false,
    references: {
      model: 'comment',
      key: 'id'
    }
  }
};
