import {authorization} from '../helpers/authorization'
import { combineResolvers } from 'graphql-resolvers';

export default {
    Query: {
        tasks: combineResolvers(
            authorization,
            async(_,{limit,page},{models}) => {
                const offset:number = (page-1)*limit
                const tasks = await models.Task.findAndCountAll({
                    limit, offset, order: [['createdAt', 'DESC'], ['isDone', 'ASC']]
                })
                if (tasks.rows.length === 0) {
                    return {tasks: null}
                }
                
                const perPage = Math.ceil(tasks.count/limit)
                const pageInfo = {
                    nextPage: page < perPage,
                    currentPage: page,
                    prevPage: page > 1
                }
                const taskSorted = tasks.rows.sort((x,y)=> {
                    return x.isDone === y.isDone ? 0 : x.isDone ? 1 : -1
                })
                return {tasks: taskSorted, pageInfo}
            }
        )
    },
    Mutation: {
        createTask: combineResolvers(
            authorization,
            async (_, {name, memberId}, {models, userLogin}) => {
                try {
                    const data = { name, memberId, masterId: userLogin.id }
                    await models.Task.create(data)
                    return 'Task has been created'
                } catch (error) {
                    return 'cannot create task'
                }
            }
        ),
        updateTask: combineResolvers(
            authorization,
            async (_, {isDone, taskId}, {models}) => {
                const updateTask = await models.Task.update({isDone}, { where: { id: taskId }, returning: true, plain:true })
                return updateTask[1].dataValues
            }
        )
    }
}