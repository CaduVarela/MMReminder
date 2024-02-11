import { Router } from 'express'
import { z } from 'zod'

import { zodValidate } from '../utils/zodValidate'
import { prismaCreate, prismaDelete, prismaFindMany, prismaFindUnique, prismaUpdate } from '../utils/factoriesRoute'

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const model = prisma.team

const route = Router()

// Used for validation
const zodSchemaCreate = z.object({
  body: z.object({
    name: z.string(),
    person: z.number().array().optional()
  }).strict()
})

const zodSchemaUpdate = z.object({
  body: z.object({
    name: z.string().optional(),

    $connect: z.object({
      person: z.number().array().optional()
    }).strict().optional(),
    
    $disconnect: z.object({
      person: z.number().array().optional()
    }).strict().optional(),
    
  }).strict()
})

route.post('/',
  zodValidate(zodSchemaCreate),
  prismaCreate(model))

route.get('/',
  prismaFindMany(model))

route.get('/:id',
  prismaFindUnique(model, { person: true }))

route.put('/:id',
  zodValidate(zodSchemaUpdate),
  prismaUpdate(model))

route.delete('/:id',
  prismaDelete(model))

export default route