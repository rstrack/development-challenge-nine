import { inject, injectable } from 'inversify'
import { IPatientRepository } from '../repositories/IPatientRepository'
import {
  ListPatientsRequest,
  ListPatientsResponse,
} from '../dtos/listPatientsDTO'
import {
  PAGINATION_DEFAULT_SIZE,
  PAGINATION_MAX_SIZE,
} from '../common/pagination'

@injectable()
export class ListPatientsService {
  constructor(
    @inject('PatientRepository')
    private patientRepository: IPatientRepository
  ) {}
  async execute({
    page,
    length,
    input,
  }: ListPatientsRequest): Promise<ListPatientsResponse> {
    let lengthNumber
    const lengthAux = Number(length)
    isNaN(lengthAux)
      ? (lengthNumber = PAGINATION_DEFAULT_SIZE)
      : lengthAux > PAGINATION_MAX_SIZE
      ? (lengthNumber = PAGINATION_MAX_SIZE)
      : (lengthNumber = Math.abs(lengthAux))

    let pageNumber
    const pageAux = Number(page)
    isNaN(pageAux) ? (pageNumber = 0) : (pageNumber = Math.abs(pageAux))

    const count = await this.patientRepository.count(input)
    const data = await this.patientRepository.list(
      pageNumber,
      lengthNumber,
      input
    )
    return { count, data }
  }
}
