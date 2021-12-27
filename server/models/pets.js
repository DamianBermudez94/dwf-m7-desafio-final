"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pet = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("./db");
class Pet extends sequelize_1.Model {
}
exports.Pet = Pet;
Pet.init({
    name: sequelize_1.DataTypes.STRING,
    image: sequelize_1.DataTypes.STRING,
    lastGeo_lat: sequelize_1.DataTypes.FLOAT,
    lastGeo_lon: sequelize_1.DataTypes.FLOAT,
    place: sequelize_1.DataTypes.STRING,
    founded: sequelize_1.DataTypes.BOOLEAN,
    userId: sequelize_1.DataTypes.INTEGER,
}, { sequelize: db_1.sequelize, modelName: "pet" });
