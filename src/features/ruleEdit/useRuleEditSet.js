import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectOneTransaction } from 'features/transactions'
import { ruleEditSetNewRule } from 'features/ruleEdit'
import { isNilOrEmpty } from 'lib/isNilOrEmpty'
import * as R from 'ramda'

// eslint-disable-next-line
import { yellow } from 'logger'
import { green } from 'logger'

const getHasRule = (transaction) => {
  return isNilOrEmpty(transaction) ? null : R.prop('hasRule')(transaction)
}

export const useRuleEditSet = (transactionId) => {

  const dispatch = useDispatch()

  const transaction = useSelector((state) =>
    selectOneTransaction(transactionId, state)
  )

  useEffect(() => {
    if (!isNilOrEmpty(transaction)) {
      const hasRule = getHasRule(transaction)
      if (hasRule) {
        // TODO: do nothing for now
      } else {
        const { origDescription, date } = transaction
        dispatch(ruleEditSetNewRule({origDescription, date}))
      }
    }
  }, [dispatch, transaction])
  
}
