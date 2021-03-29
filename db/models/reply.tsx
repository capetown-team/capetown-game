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
      allowNull: false,
      references: {
        model: 'comment',
        key: 'id' 
      }      
    },
    userid: {
      type: DataType.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id' 
      }      
    }
  };