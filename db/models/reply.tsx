import { DataType } from 'sequelize-typescript';
import { sequelize } from 'server/middlewares/db_connection';

export const Reply = sequelize.define("reply", {
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
    id_comment: {
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
