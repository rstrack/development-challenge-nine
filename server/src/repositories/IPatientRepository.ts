import { Patient } from '../entities/Patient'

export interface IPatientRepository {
  save(patient: Patient): Promise<Patient>

  delete(patientID: string): Promise<Patient>

  findByID(patientID: string): Promise<Patient | null>

  list(page: number, length: number, input?: string): Promise<Patient[]>

  count(input?: string): Promise<number>
}
