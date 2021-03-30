import * as express from 'express'
import * as morgan from 'morgan'
import * as bodyParser from 'body-parser'
import fruitRouter from './routes/fruits.js'

class App {
  public app 

  constructor() {
    this.app = express()
    this.applyMiddleware()
    this.applyRoutes()
  }

  applyMiddleware():void {
    this.app.use(morgan('dev'))
    this.app.use(bodyParser.urlencoded({extended: false}))
    this.app.use(bodyParser.json())
  }

  applyRoutes():void {
    this.app.use('/fruits', fruitRouter)
  }
}

export default new App().app
