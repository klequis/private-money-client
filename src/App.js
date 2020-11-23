import React, { useEffect } from 'react'
import * as R from 'ramda'
import { useSelector, useDispatch } from 'react-redux'
import {
  transactionsFetch,
  selectActiveTransactionId,
  Transactions,
  setRefresh,
  selectRefreshStatus
} from 'features/transactions'
import { RuleCreate, rulesFetch } from 'features/rules'
import { requestStatusNames, requestStatusStates } from 'features/requestStatus'
import { getRequestStatus } from 'features/requestStatus'
import { RenderWhenReady } from 'features/requestStatus'
// import { ContainerFluid } from 'components/ContainerFluid'
import { isNilOrEmpty } from 'lib/isNilOrEmpty'
import { useRuleEditSet } from 'features/rules/useRuleEditSet'

// eslint-disable-next-line
import { green, yellow, red } from 'logger'
// eslint-disable-next-line
import { RenderCount } from 'components/RenderCount'

let countTotal = 0
let countReturn = 0

// const getTransactionId = (transaction) => {
//   return isNilOrEmpty(transaction) ? '' : transaction._id
// }

// const getFirstTransaction= (transactions) => {
//   return isNilOrEmpty(transactions) ? null : transactions[0]
// }

export const App = () => {
  countTotal = countTotal + 1

  const dispatch = useDispatch()

  const state = useSelector((state) => state)
  const status = getRequestStatus(
    [
      requestStatusNames.rulesFetchStatus,
      requestStatusNames.transactionsFetchStatus
    ],
    state
  )

  const activeTransactionId = useSelector(selectActiveTransactionId)

  const refreshTransactions = useSelector(selectRefreshStatus)

  useEffect(() => {
    if (status === requestStatusStates.idle || refreshTransactions === true) {
      dispatch(transactionsFetch())
      dispatch(rulesFetch())
      dispatch(setRefresh(false))
    }
  }, [dispatch, status, refreshTransactions])

  useRuleEditSet(activeTransactionId)

  countReturn = countReturn + 1

  return (
    <RenderWhenReady status={status} className="container-fluid">
      <>
        <RenderCount
          componentName="App"
          countTotal={{ actual: countTotal, min: 8, max: 14 }}
          countReturn={{ actual: countReturn, min: 8, max: 10 }}
        />
        {isNilOrEmpty(activeTransactionId) ? <Transactions /> : <RuleCreate />}
      </>
    </RenderWhenReady>
  )
}

