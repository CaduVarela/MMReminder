import { RequestHandler } from "express"
import { database } from "../database"
import Nedb from "nedb"

export function nedbCreate(targetDatabase: string): RequestHandler {
  return (req, res) => {
    try {
      const data = req.body
      
      database[targetDatabase as keyof typeof database].loadDatabase()

      database.person.insert(data, (err, doc) => {
        if (err) {
          res.status(500).json(err)
        }

        res.status(200).json({
          detail: "Registered successfully"
        })
      })
    } catch (err) {
      if (err instanceof Nedb) {
        res.status(500).json(err)
        return
      }
      res.status(500).json(err)
    }
  };
}

export function nedbFindMany(targetDatabase: string, findOptions: Object = {}): RequestHandler {
  return (req, res) => {
    try {
      
      database[targetDatabase as keyof typeof database].loadDatabase()

      database[targetDatabase as keyof typeof database].find({ ...findOptions }, (err: any, docs: any) => {
        res.status(200).json(docs)
      })

    } catch (err) {
      if (err instanceof Nedb) {
        res.status(500).json(err)
        return
      }
      res.status(500).json(err)
    }
  };
}

export function nedbFindOne(targetDatabase: string, findOptions: Object = {}): RequestHandler {
  return (req, res) => {
    try {
      const _id = req.params.id
      
      database[targetDatabase as keyof typeof database].loadDatabase()

      database[targetDatabase as keyof typeof database].findOne({ _id }, (err, docs) => {
        if (docs === null) {
          res.status(400).json({
            detail: 'Entity not found'
          })
          return
        }
        res.status(200).json(docs)
      })

    } catch (err: any) {
      if (err instanceof Nedb) {
        res.status(500).json(err)
        return
      }

      res.status(500).send(err)
    }
  };
}

export function nedbDelete(targetDatabase: string): RequestHandler {
  return (req, res) => {
    try {
      const _id = req.params.id

      database[targetDatabase as keyof typeof database].loadDatabase()

      database[targetDatabase as keyof typeof database].remove({ _id }, {}, (err, docs) => {
        if (docs === 0) {
          res.status(400).json({
            detail: 'Entity not found'
          })
          return
        }
        res.status(200).json({
          detail: 'Entity deleted'
        })
      })

    } catch (err: any) {
      if (err instanceof Nedb) {
        res.status(500).json(err)
        return
      }

      res.status(500).send(err)
    }
  };
}

export function nedbUpdate(targetDatabase: string): RequestHandler {
  return (req, res) => {
    try {
      const data = req.body
      const _id = req.params.id
      
      database[targetDatabase as keyof typeof database].loadDatabase()

      database.person.update({ _id }, { $set: data  }, {}, (err, doc) => {
        if (err) {
          res.status(500).json(err)
        }

        res.status(200).json({
          detail: "Updated successfully"
        })
      })
    } catch (err) {
      if (err instanceof Nedb) {
        res.status(500).json(err)
        return
      }
      res.status(500).json(err)
    }
  };
}