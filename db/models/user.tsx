import { DataType } from 'sequelize-typescript';

export const User = {
    id: {
      type: DataType.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    first_name: {
      type: DataType.STRING,
      allowNull: false
    },
    second_name: {
      type: DataType.STRING,
      allowNull: false
    },
    login: {
      type: DataType.STRING,
      allowNull: false
    },
    phone: {
      type: DataType.STRING,
      allowNull: false
    },
    password: {
      type: DataType.STRING,
      allowNull: false
    }
