import { DataTypes, Model } from "sequelize";

import { sequelize } from "../../db";

export class TaskModel extends Model {}

TaskModel.init(
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    status: {
      type: DataTypes.ENUM,
      values: ["todo", "in-progress", "done", "postponed", "archived"],
      defaultValue: "todo",
    },
  },
  {
    sequelize,
    modelName: "Task",
    tableName: "tasks",
    timestamps: true,
  }
);
