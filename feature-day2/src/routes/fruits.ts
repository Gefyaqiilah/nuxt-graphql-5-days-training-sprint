import { Router } from 'express'
import controllers from '../controllers/fruits'

const router = Router()

router.get('/', controllers.getAllFruits)

export default router