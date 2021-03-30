"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_1 = require("../config/config");
const sequelize = new sequelize_1.Sequelize(config_1.configs.database, config_1.configs.username, config_1.configs.password, { port: config_1.configs.config.port || 54320,
    host: config_1.configs.config.host || "localhost",
    dialect: "postgres", });
class Fruit extends sequelize_1.Model {
}
Fruit.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: sequelize_1.DataTypes.STRING,
    is_sweet: sequelize_1.DataTypes.BOOLEAN,
    quantity: sequelize_1.DataTypes.INTEGER
}, {
    tableName: 'Fruits',
    sequelize
});
exports.default = Fruit;
//# sourceMappingURL=fruit.js.map