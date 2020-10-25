import { isNil, isEmpty } from 'ramda'

export const isNilOrEmpty = (value)  => {
  if (isNil(value) || isEmpty(value)) {
    return true
  }
  return false

}