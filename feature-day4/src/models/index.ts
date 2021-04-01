import ToDoModel from './todo'
import sequelize from '../configs/config'

const models = {
  ToDo: ToDoModel
}

export { sequelize }

export default models