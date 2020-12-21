import { isNil, isEmpty } from 'ramda'

export const notNilOrEmpty = (value)  => {
  if (isNil(value) || isEmpty(value)) {
    return false
  }
  return true
}