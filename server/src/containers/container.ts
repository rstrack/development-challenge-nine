import 'reflect-metadata'

import { Container } from 'inversify'
import { AddressRepository } from '../repositories/implementations/MySQL/AddressRepository'
import { DateProvider } from '../providers/date/implementations/date-fns/DateProvider'
import { IAddressRepository } from '../repositories/IAddressRepository'
import { IDateProvider } from '../providers/date/IDateProvider'
import { IPatientRepository } from '../repositories/IPatientRepository'
import { PatientRepository } from '../repositories/implementations/MySQL/PatientRepository'

const container = new Container()

container
  .bind<IDateProvider>('DateProvider')
  .to(DateProvider)
  .inSingletonScope()

container
  .bind<IPatientRepository>('PatientRepository')
  .to(PatientRepository)
  .inSingletonScope()
container
  .bind<IAddressRepository>('AddressRepository')
  .to(AddressRepository)
  .inSingletonScope()

export { container }
