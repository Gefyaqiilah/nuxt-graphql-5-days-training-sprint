import { Supplier, Fruit, FruitsAuthor } from '../models/index'
import { Sequelize } from 'sequelize'
import { Op } from 'sequelize'

class Controller {
  public async getSupplierByFruitName (req, res) {
    const fruitName = req.params.fruitName
    try {
      const suppliers = await Supplier.findAll({
        include: [{
          model: Fruit,
          as: 'Fruits',
          where: {
            name: {
              [Op.like]: `%${fruitName}%`
            }
          }
        }, {
          model: FruitsAuthor,
          as: 'FruitsAuthors',
          where: {
            FruitId: {
              [Op.eq]: Sequelize.col('Fruits.id')
            }
          }
        }],
        where: {
          id: {
            [Op.eq]: Sequelize.col('FruitsAuthors.SupplierId')
          }
        }
      })
      res.status(200).send(suppliers)
    } catch (error) {
      console.log(`error`, error)
      res.status(5000).send(error.message)
    }
  }
  public async insertFruit(req, res) {
    const { fruitId, supplierId } = req.body
    try {
      await FruitsAuthor.create({ FruitId: fruitId, SupplierId: supplierId })
      res.status(200).send({message: 'insert succeed'})
    } catch (error) {
      console.log(`object`, error)
      res.status(5000).send(error.message)
    }
  }
}

export default new Controller