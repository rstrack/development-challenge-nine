import { injectable } from 'inversify'
import { Address } from '../../../entities/Address'
import { IAddressRepository } from '../../IAddressRepository'
import { prisma } from '../../../db/prismaClient'

@injectable()
export class AddressRepository implements IAddressRepository {
  save(address: Address): Promise<Address> {
    return prisma.address.upsert({
      where: {
        id: address.id,
      },
      create: address,
      update: {
        city: address.city,
        complement: address.complement,
        country: address.country,
        number: address.number,
        publicPlace: address.publicPlace,
        zipCode: address.zipCode,
      },
    })
  }

  deleteByPatientId(patientId: string): Promise<Address> {
    return prisma.address.delete({
      where: {
        patientId: patientId,
      },
    })
  }

  findByPatientId(patientId: string): Promise<Address | null> {
    return prisma.address.findFirst({
      where: {
        patientId: patientId,
      },
    })
  }
}
