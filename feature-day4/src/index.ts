import {app} from './app'
import models, { sequelize } from './models/index'

const port = 4000

sequelize.sync()
app.listen(port, () => {
  console.log('Server running on port :'+port)
})
