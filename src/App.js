import { Transactions } from 'features/transactions'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { FileUpload } from 'features/importData'
import { Nav } from './Nav'
import { ExportData } from 'features/exportData'

/* eslint-disable */
import { green, yellow, red, purple } from 'logger'
import { RenderCount } from 'components/RenderCount'
/* eslint-enable */

export const App = () => {
  return (
    <Router>
      <Nav />
      <main>
        <Switch>
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
      </main>
    </Router>
  )
}
