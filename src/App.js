import React, { useEffect } from 'react'
import * as R from 'ramda'

import { useSelector, useDispatch } from 'react-redux'
import {
  fetchTransactions,
  setActiveTransactionId,
  selectActiveTransaction
} from 'features/transactions/transactionsSlice'
import { fetchRules } from 'features/rules/rulesSlice'
import { setRuleEdit } from 'features/ruleEdit/ruleEditSlice'
import { requestStatus } from 'globalConstants'
import isNilOrEmpty from 'lib/isNilOrEmpty'
import CreateRules from 'features/rules/Rules/CreateRules'

// eslint-disable-next-line
import { green, yellow } from 'logger'
import RenderCount from 'components/RenderCount'

// tmp
import ruleTmpMakeId from 'lib/ruleTmpMakeId'
import { ruleTmpMake } from 'lib/ruleTmpMake'
//

/**
 * 
 * @param {string} status a member of requestStatus
 * @param {array} state one or more slices as Object from redux state
 * @returns {boolean}
 */
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
 * @returns {boolean}
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
  if (statusAny(requestStatus.error, slices)) {
    return requestStatus.error
  } else if (statusAll(requestStatus.idle, slices)) {
    return requestStatus.idle
  } else if (statusAny(requestStatus.pending, slices)) {
    return requestStatus.pending
  } else if (statusAll(requestStatus.fulfilled, slices)) {
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
    }
  }, [dispatch, status, state])

  const transaction = useSelector(selectActiveTransaction)
  // tmp
  useEffect(() => {
    dispatch(setActiveTransactionId('5f77bee16b52d522df1c2bb1'))
    const origDescription = 'hillo'
    const tmpRule = ruleTmpMake(ruleTmpMakeId(), origDescription)
    dispatch(setRuleEdit(tmpRule)) // TODO: 1) finish this. 2) eliminate ruleTmp
  }, [])
  // tmp

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