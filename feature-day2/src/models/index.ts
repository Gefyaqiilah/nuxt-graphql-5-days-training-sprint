import FruitModel from './fruit'
import SupplierModel from './supplier'
// import FruitAuthorModel from './fruitauthor'
import sequelize from '../config/config'

export const Fruit = FruitModel
export const Supplier = SupplierModel

Fruit.belongsToMany(Supplier, { through: 'fruits_author' })
Supplier.belongsToMany(Fruit, { through: 'fruits_author'})
