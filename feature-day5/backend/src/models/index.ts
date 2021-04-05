import db from '../configs/db'
import Master from './master'
import Member from './member'
import Task from './task'

// associations
Task.belongsTo(Member, { foreignKey: 'memberId' })
Task.belongsTo(Master)

Member.belongsTo(Master)
Member.hasMany(Task, { foreignKey: 'memberId', as: 'TasksMember' })

Master.hasMany(Member)
Master.hasMany(Task)

export { db }

export default {
    Task, Member, Master
}