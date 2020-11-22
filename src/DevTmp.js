import React, { useEffect } from 'react'
import App from './App'
import { useDispatch } from 'react-redux'
import { activeTransactionidSet } from 'features/transactions'
/*
import * as R from 'ramda'
import {
  fetchTransactions,
  selectActiveTransaction
} from 'features/transactions'

import { fetchRules } from 'features/rules'
*/

// eslint-disable-next-line
import { green, red } from 'logger'
import { RenderCount } from 'components/RenderCount'

let countTotal = 0
let countReturn = 0

export const DevTmp = () => {
  countTotal = countTotal + 1

  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(activeTransactionidSet('5f77bee16b52d522df1c2bb1'))
  })

  countReturn = countReturn + 1
  return (
    <div>
      <RenderCount
        componentName="DevTmp"
        countTotal={{ actual: countTotal, min: 2, max: 2 }}
        countReturn={{ actual: countReturn, min: 2, max: 2 }}
      />
      <App />
    </div>
  )
}
