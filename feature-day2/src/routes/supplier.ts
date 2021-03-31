import { Router } from 'express'
import controllers from '../controllers/supplier'

const router = Router()

router
.get('/:fruitName', controllers.getSupplierByFruitName)
.post('/', controllers.insertFruit)

export default router