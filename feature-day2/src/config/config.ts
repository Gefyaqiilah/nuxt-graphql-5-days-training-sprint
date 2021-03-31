import { Sequelize } from 'sequelize'

const configs = {
  username: "postgres",
  password: "gefypostgre",
  database: "fruit",
  config: {
    port: 5432,
    host: "127.0.0.1",
    dialect: "postgres"
  }
}

const sequelize = new Sequelize(
  configs.database, configs.username,
  configs.password,
  { port: configs.config.port || 54320,
    host: configs.config.host || "localhost",
    dialect: "postgres"})

export default sequelize