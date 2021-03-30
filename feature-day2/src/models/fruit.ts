import { BuildOptions, DataTypes, Model, Sequelize, Optional } from 'sequelize'
import { configs } from '../config/config'

const sequelize = new Sequelize(configs.database, configs.username, configs.password,
   {port: configs.config.port || 54320,
  host: configs.config.host || "localhost",
  dialect: "postgres",})
// if (config.use_env_variable) {
//   sequelize = new Sequelize(process.env[config.use_env_variable], config);
// } else {
//   sequelize = new Sequelize(config.database, config.username, config.password, config);
// }

export interface FruitAttributes {
    id: number
    name: string
    is_sweet: boolean
    quantity: number
}

// Some attributes are optional in `User.build` and `User.create` calls
interface FruitCreationAttributes extends Optional<FruitAttributes, "id"> {}

class Fruit extends Model<FruitAttributes, FruitCreationAttributes> implements FruitAttributes {
  public id!: number; // Note that the `null assertion` `!` is required in strict mode.
  public name!: string;
  public is_sweet: boolean
  public quantity: number

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  
}

Fruit.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: DataTypes.STRING,
  is_sweet: DataTypes.BOOLEAN,
  quantity: DataTypes.INTEGER
}, {
  tableName: 'Fruits',
  sequelize
});

export default Fruit