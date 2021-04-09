import { DataType } from 'sequelize-typescript';

export const Theme = {
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
    hidden: {
      type: DataType.BOOLEAN,
      allowNull: false
    },
    data: {
      type: DataType.JSON,
      allowNull: false
    }
