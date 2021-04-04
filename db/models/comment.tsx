import { DataType } from 'sequelize-typescript';
import { sequelize } from 'server/middlewares/db_connection';

export const Comment = sequelize.define("comment", {
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
    id_topic: {
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
