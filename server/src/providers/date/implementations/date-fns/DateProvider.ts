import { isValid, parseISO } from 'date-fns'
import { injectable } from 'inversify'
import { IDateProvider } from '../../IDateProvider'

@injectable()
export class DateProvider implements IDateProvider {
  stringToDate(date: string): Date {
    return parseISO(date)
  }

  isValidStringDate(date: string): boolean {
    return isValid(parseISO(date))
  }
}
