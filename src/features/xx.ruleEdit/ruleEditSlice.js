import { api } from 'api'

import { requestStatus } from 'globalConstants'
import * as R from 'ramda'

// eslint-disable-next-line
import { blue, red, purple } from 'logger'
// eslint-disable-next-line
import { logFetchResults } from 'lib/logFetchResults'









export const ruleEditReducer = ruleEditSlice.reducer



// const hasRuleEdit = state => !(R.path(['state', 'ruleEdit']) === null)









/**
 * 
 * @param {object} state 
 * @returns {array} 
 * 
 */
export const selectRuleEditAction = (actionId, state) => {
  const actions = R.path(['ruleEdit', 'ruleEdit', 'actions'], state)
  const action = R.find(R.propEq('_id', actionId), actions)
  return action
}




// not in use
/**
 * 
 * @param {object} state
 * @returns {string} state.ruleEdit._id
 */
// export const selectRuleEditId = (state) => {
//   const id = R.path(['ruleEdit', 'ruleEdit', '_id'], state)
//   return R.isNil(id) ? '' : id
// }






/*

    - But what about creating the rule right away?
    - The first time you try to touch anything with RuleEdit it sets it || throws if activeTransactionId
      is not set
  
      
    selectActiveCriteria
    selectRuleEdit
    selectRuleEditCriteria
    selectRuleEditAction
    selectRuleEditActions
    selectRuleEditId
    selectRuleEditIsDirty
    selectRuleEditIsTmpRule
    selectRuleEditRenameDescriptionAction


*/
