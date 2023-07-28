import { Patient } from '@prisma/client'

export type ListPatientsRequest = {
  page: string | undefined
  length: string | undefined
  input: string | undefined
}

export type ListPatientsResponse = {
  count: number
  data: Patient[]
}
