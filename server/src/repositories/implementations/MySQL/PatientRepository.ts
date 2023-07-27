import { injectable } from 'inversify'
import { IPatientRepository } from '../../IPatientRepository'
import { Patient } from '../../../entities/Patient'
import { prisma } from '../../../db/prismaClient'

@injectable()
export class PatientRepository implements IPatientRepository {
  save(patient: Patient): Promise<Patient> {
    return prisma.patient.upsert({
      where: {
        id: patient.id,
      },
      create: patient,
      update: patient,
    })
  }

  delete(patientId: string): Promise<Patient> {
    return prisma.patient.delete({
      where: {
        id: patientId,
      },
    })
  }

  findByID(patientId: string): Promise<Patient | null> {
    return prisma.patient.findFirst({
      where: {
        id: patientId,
      },
    })
  }

  list(page: number, length: number, searchInput?: string): Promise<Patient[]> {
    return prisma.patient.findMany({
      where: {
        OR: searchInput
          ? [
              { email: { contains: searchInput } },
              { name: { contains: searchInput } },
            ]
          : undefined,
      },
      take: length,
      skip: page * length,
      orderBy: {
        name: 'asc',
      },
    })
  }

  count(searchInput?: string): Promise<number> {
    return prisma.patient.count({
      where: {
        OR: searchInput
          ? [
              { email: { contains: searchInput } },
              { name: { contains: searchInput } },
            ]
          : undefined,
      },
    })
  }
}