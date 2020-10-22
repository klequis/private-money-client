import React, { useEffect } from 'react'
import * as R from 'ramda'
import { useSelector, useDispatch } from 'react-redux'
import {
  transactionsFetch,
  selectActiveTransactionId,
  Transactions
} from 'features/transactions'
import { CreateRule, rulesFetch } from 'features/rules'
import { requestStatus } from 'globalConstants'
import getRequestStatus from 'lib/getRequestStatus'
import RequestStatus from 'components/RequestStatus'
import ContainerFluid from 'components/ContainerFluid'

import { isNull } from 'dataTypes'

// eslint-disable-next-line
import { green, yellow, red } from 'logger'
import RenderCount from 'components/RenderCount'

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
      dispatch(transactionsFetch())
      dispatch(rulesFetch())
    }
  }, [dispatch, state, status])

  const activeTransactionId = useSelector(selectActiveTransactionId)

  countReturn = countReturn + 1

  return (
    <RequestStatus status={status} className='container-fluid'>
      <>
        <RenderCount
          componentName="App"
          countTotal={{ actual: countTotal, min: 8, max: 14 }}
          countReturn={{ actual: countReturn, min: 8, max: 10 }}
        />
        {
          isNull(activeTransactionId)
            ? <Transactions />
            : <CreateRule />

        }
      </>
      
    </RequestStatus>
  )
}

export default App