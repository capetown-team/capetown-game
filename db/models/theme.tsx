import { DataType } from 'sequelize-typescript';
import { sequelize } from 'server/middlewares/db_connection';

export const Theme = sequelize.define("theme", {
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
  }, {
    timestamps: false
});

