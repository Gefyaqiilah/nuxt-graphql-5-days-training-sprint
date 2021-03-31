import { Fruit } from '../models/index'

class Controller {
  public async insertNewFruits(req, res) {
    const { name, isSweet, quantity } = req.body
    try {
      await Fruit.create({ name, is_sweet: isSweet, quantity })
      res.send('fruit has been created')
    } catch (error) {
      res.send('created failed') 
    }
  }

  public async getAllFruits(req, res) {
    try {
      const fruits = await Fruit.findAll()
      res.status(200).json({ message: 'success', data:fruits})
    } catch (error) {
      res.status(500).json('Looks like server having trouble')
    }
  }

  public async getFruitsById(req, res) {
    const fruitId = req.params.id
    try {
      if (!fruitId) throw {message: 'fruitId cannot be empty', code: 400} 
      const fruit = await Fruit.findByPk(fruitId)
      res.status(200).json({message: 'success', data: fruit})
    } catch (error) {
      res.status(error.code).send(error.message)
    }
  }

  public async deleteFruitById(req, res) {
    const fruitId = req.params.id
    try {
      if (!fruitId) throw {message: 'fruitId cannot be empty', code: 400} 
      await Fruit.destroy({
        where: { id: fruitId }
      })
      res.status(200).json({message: 'success'})
    } catch (error) {
      res.status(error.code).send(error.message)
    }
  }

  public async updateFruitById(req, res) {
    const fruitId = req.params.id
    const { name, isSweet, quantity } = req.body

    const dataRequest = { name, is_sweet:isSweet, quantity }
    const createData = {}
    for (const obj in dataRequest) {
      if (dataRequest[obj] !== null && dataRequest[obj] !== undefined) {
        createData[obj] = dataRequest[obj]
      }
    }
    try {
      if (Object.keys(createData).length === 0) throw { message: 'nothing to update', code: 400 }
      await Fruit.update(createData, { where: { id: fruitId } })
      res.status(200).send({ message: 'success', data: createData })
    } catch (error) {
      const errorCode = error.code
      res.status(errorCode||500).json(error.message)
    }
  }
}

export default new Controller()