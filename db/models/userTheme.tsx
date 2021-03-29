import { DataType } from 'sequelize-typescript';

export const UserTheme = {
    id: {
      type: DataType.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    id_theme: {
      type: DataType.INTEGER,
      allowNull: false
    },
    id_user: {
      type: DataType.INTEGER,
      allowNull: false
    }
  };