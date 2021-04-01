import {authorization} from '../helpers/authorization'
import { combineResolvers } from 'graphql-resolvers';

export default {
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