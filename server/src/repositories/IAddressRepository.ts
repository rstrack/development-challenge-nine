import { Address } from '../entities/Address'

export interface IAddressRepository {
  save(address: Address): Promise<Address>

  deleteByPatientId(addressId: string): Promise<Address>

  findByPatientId(patientId: string): Promise<Address | null>
}
