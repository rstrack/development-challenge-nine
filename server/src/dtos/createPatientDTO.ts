import { Address } from '../entities/Address'
import { Patient } from '../entities/Patient'

export type CreatePatientRequest = {
  birthDate: string
  email: string
  name: string
  address: Address
}

export type CreatePatientResponse = Patient & { address: Address }
