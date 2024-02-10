import { Router } from 'express'

import personRouter from './person'

const router = Router()

router.use('/person', personRouter)

export { router }