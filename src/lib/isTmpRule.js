import * as R from 'ramda'

/**
 * 
 * @param {string} ruleId the _id for the rule
 * @returns {boolean} true if the ruleId starts with 'tmp_
 */
export const isTmpRule = (ruleId) => {
  return R.startsWith('tmp_', ruleId)
}