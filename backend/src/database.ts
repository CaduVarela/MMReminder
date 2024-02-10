import Datastore from 'nedb'

// export type Person = {
//   _id?: string,

//   name: string,
//   email: string,
//   phone?: number
// }

// export type Team = {
//   _id?: string,

//   name: string,
//   member: Person[]
// }

//
const database = {
  person: new Datastore({filename: "./database/person.db", autoload: true}),
  team: new Datastore({filename: "./database/team.db", autoload: true})
}

export { database }