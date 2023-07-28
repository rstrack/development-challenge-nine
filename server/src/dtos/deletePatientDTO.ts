import { Patient } from '../entities/Patient'

export type DeletePatientRequest = {
  patientId: string
}

export type DeletePatientResponse = Patient
