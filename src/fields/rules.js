import * as R from 'ramda'

// eslint-disable-next-line
import { blue } from 'logger'

export const isTmpRule = (rule) => {
  console.group('isTmpRule')
  const { _id } = rule
  blue('_id', _id)
  const a = R.startsWith('tmp_', _id)
  
  blue('a', a)
  console.groupEnd()
  return a
}