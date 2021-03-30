import app from './app'
import { config as envConfig } from 'dotenv'

class App {
  private port
  constructor () {
    envConfig()
    this.port = process.env.PORT
  }
  serve():void {
    app.listen(this.port, () => console.log('Server running on port :' + this.port))
  }
}

const Server = new App()

Server.serve()