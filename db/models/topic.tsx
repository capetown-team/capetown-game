import { DataType } from 'sequelize-typescript';

export const Topic = {
    id: {
      type: DataType.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: DataType.STRING,
      allowNull: false
    },
    content: {
        type: DataType.STRING,
        allowNull: false
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