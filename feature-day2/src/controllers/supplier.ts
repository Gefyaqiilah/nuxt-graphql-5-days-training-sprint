import { Supplier, Fruit } from '../models/index'
import { Op } from 'sequelize'

class Controller {
  public async getSupplierByFruitName (req, res) {
    const fruitName = req.params.fruitName
    console.log(`fruitName`, fruitName)
    try {
      const suppliers = await Supplier.findAll({
        include: {
          model: Fruit
        }
      })
      res.status(200).send(suppliers)
    } catch (error) {
      console.log(`error`, error)
      res.status(5000).send(error.message)
    }
  }
}

export default new Controller