import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import { ImportData } from './ImportData'
import { Transactions } from './Transactions'
export const Home = () => {
  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/import-data">Upload</Link>
          </li>
          <li>
            <Link to="/transactions">Transactions</Link>
          </li>
        </ul>
      </nav>
      <Switch>
        <Route path="/import-data">
          <ImportData />
        </Route>
        <Route path="/transactions">
          <Transactions />
        </Route>
      </Switch>
    </Router>
  )
}
