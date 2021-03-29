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
      allowNull: false,
      references: {
        model: 'topic',
        key: 'id' 
      }      
    },
    userId: {
      type: DataType.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id' 
      }      
    }
  };