import { Router } from 'express'
import { z } from 'zod'
import validator from 'validator'

import { zodValidate } from '../utils/zodValidate'
import { prismaCreate, prismaDelete, prismaFindMany, prismaFindUnique, prismaUpdate } from '../utils/factoriesRoute'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const model = prisma.person

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
    ).or(z.string().max(0)).optional(),

    $connect: z.object({
      teams: z.number().array().optional()
    }).strict().optional()
  }).strict()
})

const zodSchemaUpdate = z.object({
  body: z.object({
    name: z.string().optional(),
    email: z.string().email().optional(),

    // Only accepts pt-BR phone numbers

    phone: z.union([
      z.string().max(0),
      z.string().refine(
        (value) => validator.isMobilePhone(value, 'pt-BR'),
        {
          message: "Invalid phone number",
          path: ["phone"]
        }
      )
    ]).optional(),

    $connect: z.object({
      teams: z.number().array().optional()
    }).strict().optional(),

    $disconnect: z.object({
      teams: z.number().optional().array()
    }).strict().optional()
  }).strict()
})

route.post('/',
  zodValidate(zodSchemaCreate),
  prismaCreate(model))

route.get('/',
  prismaFindMany(model, { teams: true }))

route.get('/:id',
  prismaFindUnique(model, { teams: true }))

route.put('/:id',
  zodValidate(zodSchemaUpdate),
  prismaUpdate(model))

route.delete('/:id',
  prismaDelete(model))

export default route