import { randomUUID } from 'crypto'

export class Address {
  public readonly id: string
  public zipCode: string
  public publicPlace: string
  public number: string
  public complement: string
  public city: string
  public country: string
  public patientId: string

  constructor(props: Omit<Address, 'id'>, id?: string) {
    Object.assign(this, props)
    !id ? (this.id = randomUUID()) : (this.id = id)
  }
}
