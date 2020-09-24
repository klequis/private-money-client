import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import AllDataByDescription from 'features/AllDataByDescription'
import Container from 'react-bootstrap/Container'
import Rules from 'features/rules/Rules'
import * as R from 'ramda'

//

import { useSelector, useDispatch } from 'react-redux'
import {
  fetchTransactions,
  selectTransactionsStatus,
  selectTransactionsError
} from 'features/transactions/transactionsSlice'
import { fetchRules, selectRulesError } from 'features/rules/rulesSlice'
import { requestStatus } from 'globalConstants'

// eslint-disable-next-line
// @ts-ignore
import { green } from 'logger'

const INTERNAL_SERVER_ERROR = 'internal server error'

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
    }
  }, [dispatch, transactionsStatus])

  const status = getRequestStatus(['transactions', 'rules'], state)
  const errors = getAllSliceErrors(state)
  green('App: status', status)
  green('App: errors', errors)
  green('App: R.includes', R.includes('internal server error', errors))

  if (status === requestStatus.pending || status === undefined) {
    return (
      <Container fluid>
        <h1>Loading</h1>
      </Container>
    )
  }

  if (status === requestStatus.fulfilled) {
    return (
      <Container id="App" fluid>
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
      </Container>
    )
  }

  if (R.includes('internal server error', errors)) {
    return (
      <Container id="App" fluid>
        <h1>Internal Server Error</h1>
      </Container>
    )
  }

  return (
    <Container id="App" fluid>
      <h1>I don't know what went wrong</h1>
      <div>transactions error: {transactionsError}</div>
      <div>rules error: {rulesError}</div>
    </Container>
  )
}

export default App
