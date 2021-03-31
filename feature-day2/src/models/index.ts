import FruitModel from './fruit'
import SupplierModel from './supplier'
import { DataTypes } from 'sequelize'
import sequelize from '../config/config'

export const Fruit = FruitModel
export const Supplier = SupplierModel

export const FruitsAuthor = sequelize.define('Fruits_Author', {
  FruitId: {
    type: DataTypes.INTEGER,
    references: {
      model: Fruit,
      key: 'id'
    }
  },
  SupplierId: {
    type: DataTypes.INTEGER,
    references: {
      model: Supplier,
      key: 'id'
    }
  },
}, { tableName: 'fruits_author', timestamps: false, freezeTableName: true } )

Fruit.belongsToMany(Supplier, { through: FruitsAuthor })
Supplier.belongsToMany(Fruit, { through: FruitsAuthor})
Supplier.hasMany(FruitsAuthor, { foreignKey: 'SupplierId', as: 'FruitsAuthors' })