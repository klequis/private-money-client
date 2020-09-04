import { startsWith } from 'ramda'

// eslint-disable-next-line
import { blue } from 'logger'


const isTmpRule = ruleId => {
  return startsWith('tmp_', ruleId)
}

export default isTmpRule