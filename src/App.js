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
import { requestStatus } from 'globalConstants'
import { getRequestStatus } from 'lib/getRequestStatus'
import { RequestStatus } from 'components/RequestStatus'
// import { ContainerFluid } from 'components/ContainerFluid'
import { isNilOrEmpty } from 'lib/isNilOrEmpty'

// eslint-disable-next-line
import { green, yellow, red } from 'logger'
import { RenderCount } from 'components/RenderCount'

let countTotal = 0
let countReturn = 0

// const _shouldRefreshData = (originalTransactionId, currentTransactionId, status) => {
//   // return false
//   if (status === requestStatus.idle) {
//     red('status === idle', 'idle')
//     return true
//   }
//   if (originalTransactionId !== currentTransactionId) {
//     red('originalTransactionId !== currentTransactionId', ' not equal')
//     return true
//   }
//   red('return false')
//   return false
// }

export const App = () => {
  countTotal = countTotal + 1

  const dispatch = useDispatch()

  const state = useSelector((state) => state)
  const slices = R.pick(['rules', 'transactions'])(state)
  const status = getRequestStatus(slices)

  const activeTransactionId = useSelector(selectActiveTransactionId)

  const refreshTransactions = useSelector(selectRefreshStatus)

  useEffect(() => {
    if (status === requestStatus.idle || refreshTransactions) {
      dispatch(transactionsFetch())
      dispatch(rulesFetch())
      dispatch(setRefresh(false))
    }
  }, [status, refreshTransactions])

  countReturn = countReturn + 1

  return (
    <RequestStatus status={status} className="container-fluid">
      <>
        <RenderCount
          componentName="App"
          countTotal={{ actual: countTotal, min: 8, max: 14 }}
          countReturn={{ actual: countReturn, min: 8, max: 10 }}
        />
        {isNilOrEmpty(activeTransactionId) ? <Transactions /> : <RuleCreate />}
      </>
    </RequestStatus>
  )
}

