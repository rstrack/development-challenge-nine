export interface IDateProvider {
  stringToDate(date: string): Date

  isValidStringDate(date: string): boolean
}
