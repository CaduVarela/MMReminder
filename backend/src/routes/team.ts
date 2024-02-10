import { RequestHandler, Router } from 'express'
import { z } from 'zod'

import { zodValidate } from '../utils/zodValidate'
import { nedbCreate, nedbDelete, nedbFindMany, nedbFindOne, nedbUpdate } from '../utils/factoriesRoute'

const route = Router()

// Used for validation
const zodSchemaCreate = z.object({
  body: z.object({
    name: z.string(),
    member: z.string().min(16).max(16).array()
  }).strict()
})

const zodSchemaUpdate = z.object({
  body: z.object({
    name: z.string().optional(),

    $add: z.object({
      member: z.string().min(16).max(16)
    }).strict().optional(),
    
    $remove: z.object({
      member: z.string().min(16).max(16)
    }).strict().optional(),
    
  }).strict()
})

const targetDatabase = "team"

route.post('/',
  zodValidate(zodSchemaCreate),
  nedbCreate(targetDatabase))

route.get('/',
  nedbFindMany(targetDatabase))

route.get('/:id',
  nedbFindOne(targetDatabase))

route.put('/:id',
  zodValidate(zodSchemaUpdate),
  nedbUpdate(targetDatabase))

route.delete('/:id',
  nedbDelete(targetDatabase))

export default route