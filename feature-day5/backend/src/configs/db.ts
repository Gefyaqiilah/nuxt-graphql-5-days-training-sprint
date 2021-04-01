import { Sequelize } from 'sequelize'
const {
    DATABASE, USERNAME,
    PASSWORD, HOST,
    DATABASE_PORT
} = process.env
const sequelize = new Sequelize(
    DATABASE,
    "postgres",
    "gefypostgre",
    {
        port: parseInt(DATABASE_PORT),
        host: HOST,
        dialect: 'postgres'
    }
)
export default sequelize