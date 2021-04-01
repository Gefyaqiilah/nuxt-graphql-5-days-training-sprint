export default {
    Query: {
        todos: async (_, args, {models}) => {
            const todos = await models.ToDo.findAll()
            return todos
        },
        todo: async (_, {id}, {models}) => {
            const todo = await models.ToDo.findOne({ where: { id: id }, raw: true})
            return todo
        }
    },
    Mutation: {
        createTask: async(_, { task }, {models}) => {
            const newTask = await models.ToDo.create({ task })
            return newTask
        },
        deleteTask: async(_, { id }, {models}) => {
            try {
                await models.ToDo.destroy({ where: { id: id } })
                return 'succeed'
            } catch (error) {
                return 'failed'
            }
        },
        updateTask: async (_, {id, task}, {models})=> {
            const taskUpdate = await models.ToDo.update({task}, { where: { id:id }, returning: true, plain: true })
            return taskUpdate[1].dataValues
        }
    }
}