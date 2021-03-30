import Fruit from '../models/fruit'

class controller {
  public async getAllFruits(req, res) {
    try {
      const createRes = await Fruit.create({ name: 'semangko', is_sweet: true, quantity:12 })
      console.log(`createRes`, createRes)
      res.send('fruit has been created')
    } catch (error) {
      console.log(`error`, error)
      res.send('created failed') 
    }
  }
}

export default new controller()