import React, { useEffect } from 'react'
import * as R from 'ramda'

import { useSelector, useDispatch } from 'react-redux'
import {
  fetchTransactions,
  selectActiveTransaction
} from 'features/transactions/transactionsSlice'
import { fetchRules } from 'features/rules/rulesSlice'
import { ruleEditSet } from 'features/ruleEdit/ruleEditSlice'
import CreateRule from 'features/rules/Rule/CreateRule'

import { requestStatus } from 'globalConstants'
import getRequestStatus from 'lib/getRequestStatus'
import RequestStatus from 'components/RequestStatus'

// eslint-disable-next-line
import { green, yellow, red } from 'logger'
import RenderCount from 'components/RenderCount'

// tmp
import ruleTmpMakeId from 'lib/ruleTmpMakeId'
import { ruleTmpMake } from 'lib/ruleTmpMake'
//




let countTotal = 0
let countReturn = 0

const App = () => {
  countTotal = countTotal + 1

  const dispatch = useDispatch()

  // get request status
  const state = useSelector(state => state)
  const slices = R.pick(['rules', 'transactions'])(state)
  const status = getRequestStatus(slices)

  useEffect(() => {
    if (status === requestStatus.idle) {
      dispatch(fetchTransactions())
      dispatch(fetchRules())
    }
  }, [dispatch, state, status])

  /* start tmp code */

  const transaction = useSelector(selectActiveTransaction)

  useEffect(() => {
    if (R.type(transaction) !== 'Null') {
      const origDescription = transaction.origDescription
      const tmpRule = ruleTmpMake(ruleTmpMakeId(), origDescription)
      dispatch(ruleEditSet(tmpRule)) // TODO: 1) finish this. 2) eliminate ruleTmp
    }
  }, [dispatch, transaction])

  /* end tmp code */

  if (R.type(transaction) === 'Null') {
    return <h1>transaction is Null</h1>
  }

  countReturn = countReturn + 1

  return (
    <RequestStatus status={status}>
      <div>
        <RenderCount
          componentName="App"
          countTotal={{ actual: countTotal, min: 12, max: 14 }}
          countReturn={{ actual: countReturn, min: 8, max: 10 }}
        />
        <CreateRule/>
      </div>
    </RequestStatus>
  )



}

export default App
