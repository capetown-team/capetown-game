import { DataType } from 'sequelize-typescript';
import { sequelize } from 'server/middlewares/db_connection';

export const Topic = sequelize.define("topic", {
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
    id_author: {
      type: DataType.INTEGER,
      allowNull: false
    }
  }, {
    timestamps: false
});
