import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { ruleEditSetNewRule, ruleEditSetExistingRule } from 'features/rules'
import { isNilOrEmpty } from 'lib/isNilOrEmpty'
import * as R from 'ramda'
import {
  selectOneTransaction,
  selectTransactionRuleIds
} from 'features/selectors'

// eslint-disable-next-line
import { green, yellow, grpStart, grpEnd } from 'logger'
import { blue } from 'logger'

// /**
//  *
//  * @param {object} transaction
//  * @returns {true || null}
//  * @summary May receive a transaction that is {}.
//  */
// const getHasRule = (transaction) => {
//   return isNilOrEmpty(transaction) ? null : R.prop('hasRule')(transaction)
// }

const hasRule = (transaction) => R.prop('hasRule')(transaction)
const getRuleId = (transaction) => R.prop('ruleIds')(transaction)

/*
    - if transactionId === '' 
      -> done
    - else 
      - get the transaction{}


*/
export const useRuleEditSet = (transactionId) => {
  const dispatch = useDispatch()

  const transaction = useSelector((state) =>
    selectOneTransaction(transactionId, state)
  )
  // const ruleId = useSelector(selectTransactionRuleIds)

  useEffect(() => {
    if (!isNilOrEmpty(transaction)) {
      if (hasRule(transaction)) {
        // While the front-end assumes each transaction has on ruleId, the 
        // server still assumes a transaction can have multiple ruleIds
        // therefore, ruleIds is always an array of 1
        const ruleId = getRuleId(transaction)[0]
        blue('ruleId', ruleId)
        dispatch(ruleEditSetExistingRule({ ruleId }))
      } else {
        const { origDescription, date } = transaction
        dispatch(ruleEditSetNewRule({ origDescription, date }))
      }
    }
  }, [dispatch, transaction])
  grpEnd()
}
