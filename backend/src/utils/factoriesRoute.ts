import { RequestHandler } from "express";
import { ZodSchema, z } from "zod";

export function zodValidate(zodSchema: ZodSchema<any>): RequestHandler {
  return (req, res, next) => {
    try {
      const data = zodSchema.parse({
        body: req.body,
        params: req.params,
        query: req.query,
      })
      next()
    } catch (err: any) {
      if (err instanceof z.ZodError) {
        res.status(400).json(err.issues)
        return
      }

    }
  }
}

export function prismaCreate(model: any): RequestHandler {
  return async (req, res) => {
    try {
      const data = req.body

      if (data["$connect"]) {
        Object.entries(data["$connect"]).forEach(([key, value]) => {
          if (Array.isArray(value)) {
            data[key] = {
              connect: value.map((id) => ({ id }))
            }
          } else {
            data[key] = {
              connect: { id: value }
            }
          }
        })
      }

      delete data["$connect"]

      const Create = model.create.bind(model)

      const response = await Create({ data })
      res.status(200).json({
        "detail": "Registered successfully"
      })

    } catch (err: any) {

      console.error(err)
      res.status(400).json({ ...err })
    }
  }
}

export function prismaUpdate(model: any): RequestHandler {
  return async (req, res) => {
    try {
      const data = req.body
      const id = Number(req.params.id)

      if (data["$connect"]) {
        Object.entries(data["$connect"]).forEach(([key, value]) => {
          if (Array.isArray(value)) {
            data[key] = {
              connect: value.map((id) => ({ id }))
            }
          } else {
            data[key] = {
              connect: { id: value }
            }
          }
        })
      }

      if (data["$disconnect"]) {
        Object.entries(data["$disconnect"]).forEach(([key, value]) => {
          if (Array.isArray(value)) {
            data[key] = {
              ...data[key],
              disconnect: value.map((id) => ({ id }))
            }
          } else {
            data[key] = {
              ...data[key],
              disconnect: { id: value }
            }
          }
        })
      }

      delete data["$connect"]
      delete data["$disconnect"]

      const Update = model.update.bind(model)

      const response = await Update(
        {
          where: { id },
          data
        }
      )

      res.status(200).json(
        {
          "detail": "Updated successfully",
        }
      )

    } catch (err: any) {

      if (err.code === 'P2025') {
        res.status(400).json({
          "detail": "Entry not found!"
        })
        return
      }

      console.error(err)
      res.status(500).json({ ...err })
    }
  }
}

export function prismaFindUnique(model: any, prismaIncludeConfig?: Object): RequestHandler {
  return async (req, res) => {
    try {
      const id = Number(req.params.id)

      const FindOne = model.findUnique.bind(model)

      const response = await FindOne(
        {
          where: { id },
          include: prismaIncludeConfig
        }
      )

      if (response === null)
        throw new Error('P2025')

      res.status(200).json(response)

    } catch (err: any) {

      if (err.code === 'P2025' || err.message === 'P2025') {
        res.status(400).json({
          "detail": "Entry not found!"
        })
        return
      }

      console.error(err)
      res.status(400).json({ ...err })
    }
  }
}

export function prismaFindMany(model: any, prismaIncludeConfig?: Object): RequestHandler {
  return async (req, res) => {
    try {
      const page = Number(req.query.page) || 0
      const take = Number(req.query.take) || 10

      const FindMany = model.findMany.bind(model)

      const response = await FindMany(
        {
          include: prismaIncludeConfig,
          skip: page > 0 ? ((page * take) + 1) : 0,
          take: take
        }
      )

      res.status(200).json(response)

    } catch (err: any) {

      if (err.code === 'P2025') {
        res.status(400).json({
          "detail": "Entry not found!"
        })
        return
      }

      console.error(err)
      res.status(400).json({ ...err })
    }
  }
}

export function prismaFindManySimpleFilter(model: any, prismaWhereConfig: Object = {}, prismaIncludeConfig?: Object): RequestHandler {
  return async (req, res) => {
    try {
      const page = Number(req.query.page) || 0
      const take = Number(req.query.take) || 10

      const FindMany = model.findMany.bind(model)

      let formatedWhereConfig = {}
      Object.entries(prismaWhereConfig).forEach(([key, value]) => {
        formatedWhereConfig = {
          ...formatedWhereConfig,
          [key]: {
            [value]: req.body[key]
          }
        }
      })

      const response = await FindMany(
        {
          // where: { ...prismaWhereConfig },
          where: formatedWhereConfig,
          include: prismaIncludeConfig ,
          skip: page > 0 ? ((page * take) + 1) : 0,
          take: take
        }
      )

      res.status(200).json(response)

    } catch (err: any) {

      if (err.code === 'P2025') {
        res.status(400).json({
          "detail": "Entry not found!"
        })
        return
      }

      console.error(err)
      res.status(400).json({ ...err })
    }
  }
}

export function prismaDelete(model: any): RequestHandler {
  return async (req, res) => {
    try {
      const id = Number(req.params.id)

      const Delete = model.delete.bind(model)

      const response = await Delete({ where: { id } })

      res.status(200).json(
        {
          "detail": "Deleted successfully",
        }
      )

    } catch (err: any) {

      if (err.code === 'P2025') {
        res.status(400).json({
          "detail": "Entry not found!"
        })
        return
      }

      console.error(err)
      res.status(400).json({ ...err })
    }
  }
}