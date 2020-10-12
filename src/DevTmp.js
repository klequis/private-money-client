import React, { useEffect } from 'react'
import App from './App'
import { useDispatch, useSelector } from 'react-redux'
import { setActiveTransactionId, selectActiveTransactionId } from 'features/transactions/transactionsSlice'
import * as R from 'ramda'
import {
  fetchTransactions,
  selectActiveTransaction
} from 'features/transactions/transactionsSlice'
import { fetchRules } from 'features/rules/rulesSlice'

// eslint-disable-next-line
import { green, red } from 'logger'
import RenderCount from 'components/RenderCount'

let countTotal = 0
const countTotalExpected = 2
let countReturn = 0
const countReturnExpected = 2

const DevTmp = () => {
  countTotal = countTotal + 1

  const dispatch = useDispatch()

  
  useEffect(() => {
    dispatch(setActiveTransactionId('5f77bee16b52d522df1c2bb1'))
    // dispatch(fetchTransactions())
    // dispatch(fetchRules())
  })
  // const t = selectActiveTransaction()
  

  // const activeTransactionId = useSelector(selectActiveTransactionId)

  // if (R.type(activeTransactionId) === 'Null') {
  //   return null
  // }

  countReturn = countReturn + 1
  return (
    <div>
      <RenderCount
        name="DevTmp"
        countTotal={{ actual: countTotal, min: 2, max: 2 }}
        countReturn={{ actual: countReturn, min: 2, max: 2 }}
      />
      <App />
    </div>
  )
}

export default DevTmp
