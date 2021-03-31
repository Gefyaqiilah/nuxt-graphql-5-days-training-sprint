import { Router } from 'express'
import controllers from '../controllers/fruits'

const router = Router()

router
.post('/', controllers.insertNewFruits)
.get('/', controllers.getAllFruits)
.get('/:id', controllers.getFruitsById)
.delete('/:id', controllers.deleteFruitById)
.patch('/:id', controllers.updateFruitById)

export default router