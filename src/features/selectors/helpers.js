import { isNilOrEmpty } from 'lib/isNilOrEmpty'

export const valueOrEmptyArray = (value) => 
  (isNilOrEmpty(value) ? [] : value)

export const valueOrEmptyObject = (value) => 
  (isNilOrEmpty(value) ? {} : value)