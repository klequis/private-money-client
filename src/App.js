import React, { useEffect, useState } from 'react'
import * as R from 'ramda'
import { useSelector, useDispatch } from 'react-redux'
import {
  transactionsFetch,
  selectActiveTransactionId,
  Transactions,
  setRefresh,
  selectRefreshStatus
} from 'features/transactions'
import { RuleCreate, rulesFetch } from 'features/rules'
import { requestStatus } from 'globalConstants'
import getRequestStatus from 'lib/getRequestStatus'
import RequestStatus from 'components/RequestStatus'
import ContainerFluid from 'components/ContainerFluid'

// import { isNull } from 'dataTypes'
import { isNilOrEmpty } from 'lib/isNilOrEmpty'

// eslint-disable-next-line
import { green, yellow, red } from 'logger'
import RenderCount from 'components/RenderCount'

let countTotal = 0
let countReturn = 0

const _shouldRefreshData = (originalTransactionId, currentTransactionId, status) => {
  // return false
  if (status === requestStatus.idle) {
    red('status === idle', 'idle')
    return true
  }
  if (originalTransactionId !== currentTransactionId) {
    red('originalTransactionId !== currentTransactionId', ' not equal')
    return true
  }
  red('return false')
  return false
}

const App = () => {
  countTotal = countTotal + 1

  // yellow('App', 'start')
  // useEffect(() => {
  //   green('************************************')    
  // })
  // const [_activeTransactionId, _setActiveTransactionId] = useState(useSelector(selectActiveTransactionId))
  const dispatch = useDispatch()

  const state = useSelector(state => state)
  const slices = R.pick(['rules', 'transactions'])(state)
  const status = getRequestStatus(slices)

  const activeTransactionId = useSelector(selectActiveTransactionId)
  // green('activeTransactionId', activeTransactionId)

  const refreshTransactions = useSelector(selectRefreshStatus)
  // green('App: refreshTransactions', refreshTransactions)




  // green('status', status)
  // green('App: should refresh', (status === requestStatus.idle || refreshTransactions ))
  useEffect(() => {
    // green('App: useEffect')
    if (status === requestStatus.idle || refreshTransactions ) {
      // green('App.useEffect ------ 1', 'fetching')
      dispatch(transactionsFetch())
      dispatch(rulesFetch())
      dispatch(setRefresh(false))
    }
  }, [status, refreshTransactions])



  // useEffect(() => {
  //   if (_shouldRefreshData(activeTransactionId, _activeTransactionId, status)) {
  //     green('App.useEffect ------ 1', 'fetching')
  //     dispatch(transactionsFetch())
  //     dispatch(rulesFetch())
  //   }
  // } , [status, _activeTransactionId, activeTransactionId])

  // if (_activeTransactionId !== activeTransactionId) {
  //   green('_setActiveTransactionId', '_setActiveTransactionId')
  //   _setActiveTransactionId(activeTransactionId)
  // }

  // useEffect(() => {
  //   green('App.useEffect - 2', 'running')
  //   dispatch(transactionsFetch())
  //   dispatch(rulesFetch())
  // }, [activeTransactionId])


  countReturn = countReturn + 1

  return (
    <RequestStatus status={status} className='container-fluid'>
      <>
        <RenderCount
          componentName="App"
          countTotal={{ actual: countTotal, min: 8, max: 14 }}
          countReturn={{ actual: countReturn, min: 8, max: 10 }}
        />
        {
          isNilOrEmpty(activeTransactionId)
            ? <Transactions />
            : <RuleCreate />

        }
      </>

    </RequestStatus>
  )
}

export default App