import React, { useEffect } from 'react'
import * as R from 'ramda'
import { useSelector, useDispatch } from 'react-redux'
import {
  transactionsFetch,
  selectActiveTransactionId
} from 'features/transactions/transactionsSlice'
import { rulesFetch } from 'features/rules/rulesSlice'

import CreateRule from 'features/rules/Rule/CreateRule'
import { requestStatus } from 'globalConstants'
import getRequestStatus from 'lib/getRequestStatus'
import RequestStatus from 'components/RequestStatus'
import ContainerFluid from 'components/ContainerFluid'
import AllDataByDescription from 'features/AllDataByDescription'
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

  /* start tmp code */

  // const activeTransaction = useSelector(selectActiveTransaction)

  const activeTransactionId = useSelector(selectActiveTransactionId)

  // useEffect(() => {
  //   if (R.type(activeTransaction) !== 'Null') {
  //     const origDescription = activeTransaction.origDescription
  //     const tmpRule = ruleTmpMake(ruleTmpMakeId(), origDescription)
  //     dispatch(ruleEditSet(tmpRule)) // TODO: 1) finish this. 2) eliminate ruleTmp
  //   }
  // }, [dispatch, activeTransaction])

  // useEffect(() => {

  // })

  // green('transaction', activeTransaction)
  /* end tmp code */

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
            ? <AllDataByDescription />
            : <CreateRule />

        }
      </>
      
    </RequestStatus>
  )



}

export default App

/*
  return (
    <Router>
      <ContainerFluid id="App">
        <RequestStatus status={status} className='container-fluid'>
        <>
          <RenderCount
            componentName="App"
            countTotal={{ actual: countTotal, min: 12, max: 14 }}
            countReturn={{ actual: countReturn, min: 8, max: 10 }}
          />

          <Switch>
            <Route path="/create-rule">
              <CreateRule />
            </Route>
            <Route path="/">
              <AllDataByDescription />
            </Route>
          </Switch>

        </>
        </RequestStatus>
      </ContainerFluid>
    </Router>
  )
*/