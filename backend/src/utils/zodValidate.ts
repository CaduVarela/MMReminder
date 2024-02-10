import { RequestHandler } from "express"
import { ZodSchema, z } from "zod"

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
      res.status(400).json(err.issues)
      return
    }
  }
}