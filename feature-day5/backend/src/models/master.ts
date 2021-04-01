import sequelize from '../configs/db'
import { DataTypes } from 'sequelize'

const Master = sequelize.define('Master', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: true
        }
    },
    passwordHash: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [6, 10]
        }
        
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false
    }
},
{
    freezeTableName: true,
    tableName: 'masters'
})
// // associate
// Master.associate = models => {
//     Master.hasMany(models.Member)
//     Master.hasMany(models.Task)
// }


export default Master