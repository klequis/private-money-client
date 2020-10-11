import React, { useEffect } from 'react'
import * as R from 'ramda'

import { useSelector, useDispatch } from 'react-redux'
import {
  fetchTransactions,
  setActiveTransactionId,
  selectActiveTransaction
} from 'features/transactions/transactionsSlice'
import { fetchRules } from 'features/rules/rulesSlice'
import { setRuleEdit } from 'features/ruleEdit/ruleEditSlice'
import isNilOrEmpty from 'lib/isNilOrEmpty'
import CreateRules from 'features/rules/Rules/CreateRules'
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
const countTotalExpected = 8
let countReturn = 0
const countReturnExpected = 4

const App = ({ activeTransactionId }) => {
  countTotal = countTotal + 1
  red('App: activeTransactionId', activeTransactionId)

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
  }, [dispatch, status, state])

  /* start tmp code */

  const transaction = useSelector(selectActiveTransaction)
  green('App: transaction', transaction)
  useEffect(() => {
    if (R.type(transaction) !== 'Null') {
      const origDescription = 'origDescription' // transaction.origDescription
      const tmpRule = ruleTmpMake(ruleTmpMakeId(), origDescription)
      green('tmpRule', tmpRule)
      dispatch(setRuleEdit(tmpRule)) // TODO: 1) finish this. 2) eliminate ruleTmp
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
          name="App"
          countTotal={countTotal}
          countTotalExpected={countTotalExpected}
          countReturn={countReturn}
          countReturnExpected={countReturnExpected}
        />
        <CreateRules />
      </div>
    </RequestStatus>
  )



}

export default App

/*
if (status === requestStatus.fulfilled) {
    return (
      <div>
        <RenderCount
          name="App"
          countTotal={countTotal}
          countTotalExpected={countTotalExpected}
          countReturn={countReturn}
          countReturnExpected={countReturnExpected}
        />
        <CreateRules />
      </div>
    )
  }
  */