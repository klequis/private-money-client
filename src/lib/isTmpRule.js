import * as R from 'ramda'

// eslint-disable-next-line
import { red } from 'logger'

/**
 * 
 * @param {string} ruleId the _id for the rule
 * @returns {boolean} true if the ruleId starts with 'tmp_
 */
export const isTmpRule = (ruleId) => {
  red('ruleId', ruleId)
  return R.startsWith('tmp_', ruleId)
}