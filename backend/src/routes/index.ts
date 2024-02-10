import { Router } from 'express'

import personRouter from './person'
import teamRouter from './team'

const router = Router()

router.use('/person', personRouter)
router.use('/team', teamRouter)

export { router }