import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import AllDataByDescription from 'features/AllDataByDescription'
import Rules from 'features/rules/Rules'
import * as R from 'ramda'
import ContainerFluid from 'components/ContainerFluid'

//

import { useSelector, useDispatch } from 'react-redux'
import {
  fetchTransactions,
  selectTransactionsStatus,
  selectTransactionsError,
  setActiveTransactionId // tmp code
} from 'features/transactions/transactionsSlice'
import { fetchRules, selectRulesError } from 'features/rules/rulesSlice'
import { requestStatus } from 'globalConstants'


// @ts-ignore
// eslint-disable-next-line
import { green } from 'logger'

/**
 *
 * @param {array} slices names as string of redux slices to check
 * @param {object} state all if Redux state
 * @description Will return status as a `requestStatus`. First priority: If error in any slice, returns error. Second priority: If pending in any slice returns pending. Returns fulfilled only if first and second priorities are false.
 */
const getRequestStatus = (slices: string[], state: object) => {

  const any = (status: string): boolean => {
    // @ts-ignore
    return slices.map((s) => state[s].status === status).some((x) => x === true)
  }

  if (any(requestStatus.error)) {
    return requestStatus.error
  } else if (any(requestStatus.pending) || any(requestStatus.idle)) {
    return requestStatus.pending
  } else if (any(requestStatus.fulfilled)) {
    return requestStatus.fulfilled
  }
}


/**
 *
 * @param {object} state all if Redux state
 *
 */
const getAllSliceErrors = (state: object): string[] => {
  const mod = R.pipe(
    // @ts-ignore
    x => x.error === null ? '' : x.error,
    R.toLower
  )
  // green('state', state)
  // @ts-ignore
  return R.values(R.map(mod, state))
}


function App() {
  const dispatch = useDispatch()
  const transactionsStatus = useSelector((state) =>
    selectTransactionsStatus(state)
  )
  const transactionsError = useSelector((state) =>
    selectTransactionsError(state)
  )
  const rulesError = useSelector((state) => selectRulesError(state))
  const state = useSelector((state) => state)




  useEffect(() => {
    if (transactionsStatus === 'idle') {
      dispatch(fetchTransactions())
      dispatch(fetchRules())
      // TODO: tmp code - start
      /*
        In final version
        - activeTransactionId will be set by <TableBody>
      */
      dispatch(setActiveTransactionId('5f77bee16b52d522df1c2af6'))

      // tmp code - end
    }
  }, [dispatch, transactionsStatus])

  const status = getRequestStatus(['transactions', 'rules'], state)
  // green('status', status)
  const errors = getAllSliceErrors(state)

  if (status === requestStatus.pending || status === undefined) {
    return (
      <ContainerFluid id="App">
        <h1>Loading</h1>
      </ContainerFluid>
    )
  }

  if (status === requestStatus.fulfilled) {
    return (
      <ContainerFluid id="App">
        <Router>
          <Switch>
            <Route path="/create-rule">
              <Rules />
            </Route>
            <Route path="/">
              <AllDataByDescription />
            </Route>
          </Switch>
        </Router>
      </ContainerFluid>
    )
  }

  if (R.includes('internal server error', errors)) {
    return (
      <ContainerFluid id="App">
        <h1>Internal Server Error</h1>
      </ContainerFluid>
    )
  }

  return (
    <div id="App" className="container-fluid">
      <h1>I don't know what went wrong</h1>
      <div>transactions error: {transactionsError}</div>
      <div>rules error: {rulesError}</div>
    </div>
  )
}

export default App


/*
return (
    <Container id="App" fluid>
      <h1>I don't know what went wrong</h1>
      <div>transactions error: {transactionsError}</div>
      <div>rules error: {rulesError}</div>
    </Container>
  )
*/