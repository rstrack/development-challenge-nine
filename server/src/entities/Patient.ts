import { randomUUID } from 'crypto'

export class Patient {
  public readonly id: string
  public birthDate: Date
  public email: string
  public name: string

  constructor(props: Omit<Patient, 'id'>, id?: string) {
    Object.assign(this, props)

    !id ? (this.id = randomUUID()) : (this.id = id)
  }
}
