export default {
    Query: {
        todos: async (parent, args, {models}) => {
            const todos = await models.ToDo.findAll()
            return todos
        },
        todo: async (parent, {id}, {models}) => {
            const todo = await models.ToDo.findOne({ where: { id: id }, raw: true})
            return todo
        }
    },
    Mutation: {
        createTask: async(parent, { task }, {models}) => {
            const newTask = await models.ToDo.create({ task })
            return newTask
        },
        deleteTask: async(parent, { id }, {models}) => {
            try {
                await models.ToDo.destroy({ where: { id: id } })
                return 'succeed'
            } catch (error) {
                return 'failed'
            }
        }
    }
}