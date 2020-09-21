import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import AllDataByDescription from 'features/AllDataByDescription'
import Container from 'react-bootstrap/Container'
import Rules from 'features/rules/Rules'

//

import { useSelector, useDispatch } from 'react-redux'
import {
  fetchTransactions,
  selectTransactionsStatus,
  selectTransactionsError
} from 'features/transactions/transactionsSlice'
import { fetchRules, selectRulesError } from 'features/rules/rulesSlice'
import { requestStatus } from 'globalConstants'

const getRequestStatus = (slices = [], state) => {
  const any = (status) =>
    slices.map((s) => state[s].status === status).some((x) => x === true)
  if (any(requestStatus.error)) {
    return requestStatus.error
  } else if (any(requestStatus.pending || any(requestStatus.idle))) {
    return requestStatus.pending
  } else if (any(requestStatus.fulfilled)) {
    return requestStatus.fulfilled
  }
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

  switch (status) {
    case requestStatus.pending:
      return <h1>Loading</h1>
    case requestStatus.fulfilled:
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

    case requestStatus.error:
    default:
      return (
        <div>
          <div>transactions error: {transactionsError}</div>
          <div>rules error: {rulesError}</div>
        </div>
      )
  }
}

export default App
