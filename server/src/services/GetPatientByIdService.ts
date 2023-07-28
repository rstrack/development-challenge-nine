import { inject, injectable } from 'inversify'
import { IPatientRepository } from '../repositories/IPatientRepository'
import {
  GetPatientByIdRequest,
  GetPatientByIdResponse,
} from '../dtos/getPatientByIdDTO'
import { IAddressRepository } from '../repositories/IAddressRepository'

@injectable()
export class GetPatientByIdService {
  constructor(
    @inject('AddressRepository')
    private addressRepository: IAddressRepository,
    @inject('PatientRepository')
    private patientRepository: IPatientRepository
  ) {}

  async execute({
    patientId,
  }: GetPatientByIdRequest): Promise<GetPatientByIdResponse> {
    const patient = await this.patientRepository.findByID(patientId)
    if (!patient) throw Error('Paciente não encontrado')

    const address = await this.addressRepository.findByPatientId(patientId)

    return {
      ...patient,
      address: address!, //Se o paciente existe então o endereço dele obrigatoriamente existe
    }
  }
}
