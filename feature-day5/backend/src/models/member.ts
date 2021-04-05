import sequelize from '../configs/db'
import { DataTypes } from 'sequelize'

const Member = sequelize.define('Member', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    masterId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'masters',
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
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
    tableName: 'members'
})
// // associate
// Member.associate = models => {
//     Member.belongsTo(models.Master)
//     Member.hasMany(models.Task)
// }

export default Member