import { Address } from '../entities/Address'
import { Patient } from '../entities/Patient'

export type GetPatientByIdRequest = {
  patientId: string
}

export type GetPatientByIdResponse = Patient & { address: Address }
