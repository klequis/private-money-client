import * as R from 'ramda'

export const isTmpRule = (rule) => {
  const { _id } = rule
  return R.startsWith('tmp_', _id)
}