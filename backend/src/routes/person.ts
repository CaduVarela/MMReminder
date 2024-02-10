import { Router } from 'express'
import { z } from 'zod'
import validator from 'validator'

import { zodValidate } from '../utils/zodValidate'
import { nedbCreate, nedbDelete, nedbFindMany, nedbFindOne, nedbUpdate } from '../utils/factoriesRoute'

const route = Router()

// Used for validation
const zodSchemaCreate = z.object({
  body: z.object({
    name: z.string(),
    email: z.string().email(),

    // Only accepts pt-BR phone numbers
    phone: z.string().refine(
      (value) => validator.isMobilePhone(value, 'pt-BR'),
      {
        message: "Invalid phone number",
        path: ["phone"]
      }
    ).optional()
  })
})

const zodSchemaUpdate = z.object({
  body: z.object({
    name: z.string().optional(),
    email: z.string().email().optional(),

    // Only accepts pt-BR phone numbers
    phone: z.string().refine(
      (value) => validator.isMobilePhone(value, 'pt-BR'),
      {
        message: "Invalid phone number",
        path: ["phone"]
      }
    ).optional()
  })
})

const targetDatabase = "person"

route.post('/',
  zodValidate(zodSchemaCreate),
  nedbCreate(targetDatabase));

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