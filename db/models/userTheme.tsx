import { DataType } from 'sequelize-typescript';
import { sequelize } from 'server/middlewares/db_connection';

export const UserTheme = sequelize.define("users_theme", {
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
  }, {
    timestamps: false
});

