"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Report = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("./db");
class Report extends sequelize_1.Model {
}
exports.Report = Report;
Report.init({
    reporter_name: sequelize_1.DataTypes.STRING,
    phone_number: sequelize_1.DataTypes.STRING,
    message: sequelize_1.DataTypes.STRING,
    petId: sequelize_1.DataTypes.INTEGER,
}, { sequelize: db_1.sequelize, modelName: "report" });
