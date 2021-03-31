import {DataTypes, Model, Sequelize, Optional } from 'sequelize'
import { configs } from '../config/config'

const sequelize = new Sequelize(configs.database, configs.username, configs.password,
   {port: configs.config.port || 54320,
  host: configs.config.host || "localhost",
  dialect: "postgres",})

interface SupplierAttributes {
    id: number
    SupplierId: number
    FruitId:number
}

// Some attributes are optional in `User.build` and `User.create` calls
interface SupplierCreationAttributes extends Optional<SupplierAttributes, "id"> {}

class FruitAuthor extends Model<SupplierAttributes, SupplierCreationAttributes> implements SupplierAttributes {
  public id!: number; // Note that the `null assertion` `!` is required in strict mode.
  public FruitId: number
  public SupplierId:number
}

FruitAuthor.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  SupplierId: DataTypes.INTEGER,
  FruitId: DataTypes.INTEGER
}, {
  tableName: 'fruits_authors',
  sequelize,
  freezeTableName: true
});

export default FruitAuthor