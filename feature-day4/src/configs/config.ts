import { Sequelize } from 'sequelize'

const configs = {
  username: "postgres",
  password: "gefypostgre",
  database: "todo",
  port: 5432,
  host: "127.0.0.1"
}

const sequelize = new Sequelize(
    configs.database,
    configs.username,
    configs.password,
    { 
        port: configs.port,
        host: configs.host,
        dialect: "postgres"
    }
)

export default sequelize