import * as dotenv from 'dotenv'
// env config
dotenv.config()

import {db} from './models/index'
import app from './app'


const runServe = async() => {
    // dotenv config
    const PORT = process.env.SERVER_PORT || 5000
    try {
        await db.sync()
        app.listen(PORT, ()=> console.log('Server running on port :'+PORT))
        
    } catch (error) {
        console.log(`error`, error)
    }
}

// run server
runServe()