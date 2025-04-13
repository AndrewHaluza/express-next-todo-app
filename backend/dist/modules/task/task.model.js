var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../db";
var TaskModel = /** @class */ (function (_super) {
    __extends(TaskModel, _super);
    function TaskModel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return TaskModel;
}(Model));
export { TaskModel };
TaskModel.init({
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
}, {
    sequelize: sequelize,
    modelName: "Task",
    tableName: "tasks",
    timestamps: true,
});
