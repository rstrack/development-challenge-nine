import { inject, injectable } from 'inversify'
import { IPatientRepository } from '../repositories/IPatientRepository'
import {
  DeletePatientRequest,
  DeletePatientResponse,
} from '../dtos/deletePatientDTO'

@injectable()
export class DeletePatientService {
  constructor(
    @inject('PatientRepository')
    private patientRepository: IPatientRepository
  ) {}

  async execute({
    patientId,
  }: DeletePatientRequest): Promise<DeletePatientResponse> {
    const hasPatient = await this.patientRepository.findByID(patientId)

    if (!hasPatient) {
      throw Error('Paciente não encontrado')
    }

    const excludedPatient = await this.patientRepository.delete(patientId)

    /* Normalmente um valor deletado não é utilizado como retorno (pois ele
    não existe mais) porém o ORM Prisma disponibiliza esse valor, e está
    disponível caso seja interessante utilizá-lo (Neste caso, está sendo
    retornado para o controller mas não é utilizado). */
    return excludedPatient
  }
}
