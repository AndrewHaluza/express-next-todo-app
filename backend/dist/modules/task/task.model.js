"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskModel = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("../../db");
class TaskModel extends sequelize_1.Model {
}
exports.TaskModel = TaskModel;
TaskModel.init({
    title: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    status: {
        type: sequelize_1.DataTypes.ENUM,
        values: ["todo", "in-progress", "done", "postponed", "archived"],
        defaultValue: "todo",
    },
}, {
    sequelize: db_1.sequelize,
    modelName: "Task",
    tableName: "tasks",
    timestamps: true,
});
