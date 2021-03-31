import app from './app'
import { config as envConfig } from 'dotenv'

import sequelize from './config/config'
class App {
  private port
  constructor () {
    envConfig()
    this.port = process.env.PORT
  }
  async serve() {
    try {
      await sequelize.sync()
      app.listen(this.port, () => console.log('Server running on port :' + this.port))
    } catch (error) {
      console.log(`error`, error)
    }
  }
}

const Server = new App()

Server.serve()