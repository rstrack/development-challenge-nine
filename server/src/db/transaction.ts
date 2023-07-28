import { PrismaPromise } from '@prisma/client'
import { prisma } from './prismaClient'

export const transaction = (
  queries: Promise<unknown>[]
): Promise<unknown[]> => {
  return prisma.$transaction(queries as PrismaPromise<unknown>[])
}
