import { Transactions } from 'features/transactions'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { FileUpload } from 'features/importData'
import { Home } from './Home'
import { ExportData } from 'features/exportData'

/* eslint-disable */
import { green, yellow, red, purple } from 'logger'
import { RenderCount } from 'components/RenderCount'
/* eslint-enable */

export const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/import">
          <FileUpload />
        </Route>
        <Route path="/export">
          <ExportData />
        </Route>
        <Route path="/transactions">
          <Transactions />
        </Route>
      </Switch>
    </Router>
  )
}
