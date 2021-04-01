import sequelize from '../configs/config'
import { DataTypes } from 'sequelize'

const ToDo = sequelize.define('ToDo', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    task: {
        type: DataTypes.STRING,
        allowNull: false
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false
    }   
}, {freezeTableName: true, tableName: 'todo' })

export default ToDo