import { isNil, isEmpty } from 'ramda'

const isNilOrEmpty = (value)  => {
  if (isNil(value) || isEmpty(value)) {
    return true
  }
  return false

}

export default isNilOrEmpty