import { randomUUID } from 'crypto'

export class Address {
  public readonly id: string
  public zipCode: string
  public publicPlace: string
  public number: string
  public complement: string | null
  public city: string
  public state: string
  public country: string
  public patientId: string

  constructor(props: Omit<Address, 'id'>, id?: string) {
    Object.assign(this, props)
    !id ? (this.id = randomUUID()) : (this.id = id)
  }
}
