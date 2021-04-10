import { DataType } from 'sequelize-typescript';

export const UserTheme = {
    id: {
      type: DataType.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    themeId: {
      type: DataType.INTEGER,
      allowNull: false
    },
    userId: {
      type: DataType.INTEGER,
      allowNull: false
    }
  };
