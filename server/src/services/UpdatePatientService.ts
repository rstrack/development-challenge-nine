import { inject, injectable } from 'inversify'
import { IAddressRepository } from '../repositories/IAddressRepository'
import { IDateProvider } from '../providers/date/IDateProvider'
import { IPatientRepository } from '../repositories/IPatientRepository'
import { Address } from '../entities/Address'
import { Patient } from '../entities/Patient'
import { transaction } from '../db/transaction'
import {
  UpdatePatientRequest,
  UpdatePatientResponse,
} from '../dtos/updatePatientDTO'
import {
  emailValidator,
  lengthValidator,
  requiredValidator,
  zipCodeValidator,
} from '../validators/validators'
import {
  CITY_MAX_LENGTH,
  COMPLEMENT_MAX_LENGTH,
  COUNTRY_MAX_LENGTH,
  EMAIL_MAX_LENGTH,
  NAME_MAX_LENGTH,
  NUMBER_MAX_LENGTH,
  PUBLIC_PLACE_MAX_LENGTH,
  STATE_MAX_LENGTH,
} from '../common/maxLenghts'

@injectable()
export class UpdatePatientService {
  constructor(
    @inject('AddressRepository')
    private addressRepository: IAddressRepository,
    @inject('DateProvider')
    private dateProvider: IDateProvider,
    @inject('PatientRepository')
    private patientRepository: IPatientRepository
  ) {}

  async execute({
    id,
    birthDate,
    email,
    name,
    address,
  }: UpdatePatientRequest): Promise<UpdatePatientResponse> {
    if (!this.dateProvider.isValidStringDate(birthDate)) {
      throw Error('Data de nascimento inválida')
    }

    const hasPatient = await this.patientRepository.findByID(id)

    if (!hasPatient) {
      throw Error('Paciente não encontrado')
    }

    requiredValidator(birthDate, 'A data de nascimento é obrigatória')
    requiredValidator(email, 'O Email é obrigatório')
    requiredValidator(name, 'O nome é obrigatório')
    requiredValidator(address.zipCode, 'O CEP é obrigatório')
    requiredValidator(address.publicPlace, 'O Logradouro é obrigatório')
    requiredValidator(address.number, 'O número é obrigatório')
    requiredValidator(address.city, 'A cidade é obrigatória')
    requiredValidator(address.state, 'O estado é obrigatório')
    requiredValidator(address.country, 'O país é obrigatório')

    lengthValidator(
      email,
      EMAIL_MAX_LENGTH,
      `Comprimento máximo do email excedido (${EMAIL_MAX_LENGTH})`
    )
    lengthValidator(
      name,
      NAME_MAX_LENGTH,
      `Comprimento máximo do nome excedido (${NAME_MAX_LENGTH})`
    )
    lengthValidator(
      address.publicPlace,
      PUBLIC_PLACE_MAX_LENGTH,
      `Comprimento máximo do logradouro excedido (${PUBLIC_PLACE_MAX_LENGTH})`
    )
    lengthValidator(
      address.number,
      NUMBER_MAX_LENGTH,
      `Comprimento máximo do número excedido  (${NUMBER_MAX_LENGTH})`
    )
    address.complement ??
      lengthValidator(
        address.complement!,
        COMPLEMENT_MAX_LENGTH,
        `Comprimento máximo do complemento excedido  (${COMPLEMENT_MAX_LENGTH})`
      )
    lengthValidator(
      address.city,
      CITY_MAX_LENGTH,
      `Comprimento máximo da cidade excedido  (${CITY_MAX_LENGTH})`
    )
    lengthValidator(
      address.city,
      STATE_MAX_LENGTH,
      `Comprimento máximo do estado excedido  (${STATE_MAX_LENGTH})`
    )
    lengthValidator(
      address.country,
      COUNTRY_MAX_LENGTH,
      `Comprimento máximo do país excedido  (${COUNTRY_MAX_LENGTH})`
    )

    emailValidator(email)

    const emailFound = await this.patientRepository.findByEmail(email)

    if (emailFound && emailFound?.id != id) {
      throw Error('Email já registrado para outro paciente')
    }

    zipCodeValidator(address.zipCode)

    const dateBirthDate = this.dateProvider.stringToDate(birthDate)

    const patient = new Patient({ birthDate: dateBirthDate, email, name }, id)

    const [updatedPatient, updatedAddress] = await transaction([
      this.patientRepository.save(patient),
      this.addressRepository.save(
        new Address({ ...address, patientId: id }, address.id)
      ),
    ])

    return {
      ...(updatedPatient as Patient),
      address: updatedAddress as Address,
    }
  }
}
