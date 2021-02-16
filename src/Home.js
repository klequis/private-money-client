import React from 'react'
import { Link } from 'react-router-dom'

export const Home = () => {
  return (
    <div>
      <ul>
        <li>
          <Link to="/import">Import</Link>
        </li>
        <li>
          <Link to="/export">Export</Link>
        </li>
        <li>
          <Link to="/transactions">Transactions</Link>
        </li>
      </ul>
    </div>
  )
}
