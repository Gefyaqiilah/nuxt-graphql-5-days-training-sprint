import FruitModel from './fruit'
import SupplierModel from './supplier'
// import FruitAuthorModel from './fruitauthor'
import { Sequelize, DataTypes } from 'sequelize'
import { configs } from '../config/config'

export const Fruit = FruitModel
export const Supplier = SupplierModel
// export const FruitAuthor = FruitAuthorModel

const sequelize = new Sequelize(configs.database, configs.username, configs.password,
  {port: configs.config.port || 54320,
 host: configs.config.host || "localhost",
 dialect: "postgres",})

export const FruitAuthor = sequelize.define("FruitAuthor", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  }
}, {timestamps: false, freezeTableName: true, tableName: 'fruits_authors' })

// define associations
Fruit.belongsToMany(Supplier, { through: "fruits_authors" })
Supplier.belongsToMany(Fruit, { through: "fruits_authors" })
