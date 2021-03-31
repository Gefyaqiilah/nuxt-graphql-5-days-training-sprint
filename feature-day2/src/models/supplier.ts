import {DataTypes, Model, Sequelize, Optional } from 'sequelize'
import sequelize from '../config/config'

interface SupplierAttributes {
    id: number
    username: string
    fruit_id:number
}

// Some attributes are optional in `User.build` and `User.create` calls
interface SupplierCreationAttributes extends Optional<SupplierAttributes, "id"> {}

class Supplier extends Model<SupplierAttributes, SupplierCreationAttributes> implements SupplierAttributes {
  public id!: number; // Note that the `null assertion` `!` is required in strict mode.
  public username!: string;
  public fruit_id: number

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  
}

Supplier.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  username: DataTypes.STRING,
  fruit_id: DataTypes.BOOLEAN
}, {
  tableName: 'suppliers',
  sequelize,
  freezeTableName: true
});

export default Supplier