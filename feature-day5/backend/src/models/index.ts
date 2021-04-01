import db from '../configs/db'
import Master from './master'
import Member from './member'
import Task from './task'

// associations
Task.belongsTo(Member)
Task.belongsTo(Master)

Member.belongsTo(Master)
Member.hasMany(Task)

Master.hasMany(Member)
Master.hasMany(Task)

export { db }

export default {
    Task, Member, Master
}