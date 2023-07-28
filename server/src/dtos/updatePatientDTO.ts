import { Address } from '../entities/Address'
import { Patient } from '../entities/Patient'

export type UpdatePatientRequest = {
  id: string
  birthDate: string
  email: string
  name: string
  address: Address
}

export type UpdatePatientResponse = Patient & { address: Address }
