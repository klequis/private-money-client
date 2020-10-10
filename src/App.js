import React, { useEffect } from 'react'
import * as R from 'ramda'

import { useSelector, useDispatch } from 'react-redux'
import {
  fetchTransactions,
  setActiveTransactionId
} from 'features/transactions/transactionsSlice'
import { fetchRules } from 'features/rules/rulesSlice'
import { requestStatus } from 'globalConstants'

// eslint-disable-next-line
import { green, yellow } from 'logger'
import isNilOrEmpty from 'lib/isNilOrEmpty'
import CreateRules from 'features/rules/Rules/CreateRules'
import RenderCount from 'components/RenderCount'

// /**
//  *
//  * @param {object} state all if Redux state
//  * @returns {[]} an array of strings
//  */
// const getAllSliceErrors = (state) => {
//   const mod = R.pipe(
//     x => x.error === null ? '' : x.error,
//     R.toLower
//   )
//   // green('state', state)
//   return R.values(R.map(mod, state))
// }

// const getSliceStatus = (slice, state) => state[slice.status]

// const log = R.curry((msg, value) => console.log(msg, value))

const statusAll = (status, state) => {
  return R.pipe(
    R.values,
    R.all(R.equals(R.__, status))
  )(R.map(x => R.prop('status')(x), state))
}

/**
 * 
 * @param {string} status a member of requestStatus
 * @param {array} state one or more slices as Object from redux state
 */
const statusAny = (status, slices) => {
  return R.pipe(
    R.values,
    R.filter(x => x !== undefined),
    R.any(R.equals(R.__, status))
  )(R.map(x => R.prop('status')(x), slices))
}

/**
 * 
 * @param {object} slices An array of strings which are Redux slice names
 * @returns {string}
 * if >=1 = error -> error
 * if 'all' = idle -> idle
 * if >=1 = pending -> pending
 * if 'all' = fulfilled -> fulfilled
 */
const getRequestStatus = (slices) => {
  // green('state', state)
  // const filteredSlices = R.filter(R.any(slices), slices)
  // green('filteredSlices', filteredSlices)
  // error

  // green('slices', slices)
  // return requestStatus.fulfilled
  if (statusAny(requestStatus.error, slices)) {
    // green('getRequestStatus', 'error')
    return requestStatus.error
    // idle
  } else if (statusAll(requestStatus.idle, slices)) {
    // green('getRequestStatus', 'idle')
    return requestStatus.idle
    // pending
  } else if (statusAny(requestStatus.pending, slices)) {
    // green('getRequestStatus', 'pending')
    return requestStatus.pending
    // fulfilled
  } else if (statusAll(requestStatus.fulfilled, slices)) {
    // green('getRequestStatus', 'fulfilled')
    return requestStatus.fulfilled
  }
  return requestStatus.error

}


let countTotal = 0
const countTotalExpected = 10
let countReturn = 0
const countReturnExpected = 6

const App = () => {
  countTotal = countTotal + 1
  const dispatch = useDispatch()

  // get request status
  const state = useSelector(state => state)
  const slices = R.pick(['rules', 'transactions'])(state)
  const status = getRequestStatus(slices)

  useEffect(() => {
    if (status === requestStatus.idle) {
      dispatch(fetchTransactions())
      dispatch(fetchRules())
      dispatch(setActiveTransactionId('5f77bee16b52d522df1c2bb1'))
      
    }
  }, [dispatch, status, state])
  
  if (status === requestStatus.pending) {
    return <h1>Loading</h1>
  }

  if (status === requestStatus.error) {
    return <h1>Error</h1>
  }

  countReturn = countReturn + 1
  if (status === requestStatus.fulfilled) {
    return (

      <div>
        <RenderCount
          name="App"
          countTotal={countTotal}
          countTotalExpected={countTotalExpected}
          countReturn={countReturn}
          countReturnExpected={countReturnExpected}
        />
        <CreateRules />
      </div>
    )
  }

  // these are error conditions
  if (isNilOrEmpty(status)) {
    return <h1>status is empty string</h1>
  }

  if (status === 'idle') {
    return <h1>status is idle</h1>
  }

  return <h1>I don't know that status ?</h1>


}

export default App