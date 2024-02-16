export interface PersonType {
  id: number,
  name: string,
  email: string,
  phone?: string
  teams: TeamType[]
}

export interface TeamType {
  id: number,
  name: string,
  persons: PersonType[]
}