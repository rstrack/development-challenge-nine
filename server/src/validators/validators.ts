const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const zipCodeRegex = /^[0-9]{8}/

export const emailValidator = (email: string): void => {
  if (!emailRegex.test(email)) {
    throw Error('Email inválido')
  }
}

export const zipCodeValidator = (zipCode: string): void => {
  if (!zipCodeRegex.test(zipCode)) {
    throw Error('CEP inválido')
  }
}

export const requiredValidator = (field: string, errorMsg: string) => {
  if (!field) {
    throw Error(errorMsg)
  }
}

export const lengthValidator = (
  field: string,
  maxLength: number,
  errorMsg: string
) => {
  if (!!field && field.length > maxLength) {
    throw Error(errorMsg)
  }
}
