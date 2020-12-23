import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { ruleEditSetNewRule, ruleEditSetExistingRule } from 'features/rules'
import { isNilOrEmpty } from 'lib/isNilOrEmpty'
import * as R from 'ramda'
import {
  selectOneTx,
} from 'features/selectors'
import {
  wdHasRule,
  wdRuleIds
} from 'appWords'

// eslint-disable-next-line
import { blue, green, yellow, grpStart, grpEnd } from 'logger'

const _hasRule = (transaction) => R.prop(wdHasRule)(transaction)
const _getRuleId = (transaction) => R.prop(wdRuleIds)(transaction)

/*
    - if transactionId === '' 
      -> done
    - else 
      - get the transaction{}
*/
export const useRuleEditSet = (transactionId) => {
  const _dispatch = useDispatch()

  const _transaction = useSelector((state) =>
    selectOneTx(transactionId, state)
  )
  useEffect(() => {
    if (!isNilOrEmpty(_transaction)) {
      if (_hasRule(_transaction)) {
        // While the front-end assumes each transaction has on ruleId, the 
        // server still assumes a transaction can have multiple ruleIds
        // therefore, ruleIds is always an array of 1
        const _ruleId = _getRuleId(_transaction)[0]
        _dispatch(ruleEditSetExistingRule({ ruleId: _ruleId }))
      } else {
        const { origDescription, date } = _transaction
        _dispatch(ruleEditSetNewRule({ origDescription, date }))
      }
    }
  }, [_dispatch, _transaction])
}
