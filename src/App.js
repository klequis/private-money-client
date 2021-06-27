import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RenderWhenReady } from 'components/RenderWhenReady'
// import { ContainerFluid } from 'components/ContainerFluid'

import { rulesFetch } from 'features/rules'
import { txFetch } from 'features/tx'
import { acctFetch } from 'features/acct'

import { Home } from './Home'

import {
  selectAcctFetchStatus,
  selectTxFetchStatus,
  selectRulesFetchStatus,
  selectRequestStatus
} from 'features/selectors'

import { wdRequestStatusFetch, wdAcct, wdTx, wdRules } from 'appWords'

/* eslint-disable */
import { green, yellow, red, purple } from 'logger'
import { RenderCount } from 'components/RenderCount'
/* eslint-enable */

let countTotal = 0
let countReturn = 0

export const App = () => {
  countTotal = countTotal + 1
  const _dispatch = useDispatch()

  const _status = useSelector((state) =>
    selectRequestStatus([wdRules, wdTx, wdAcct], state)
  )
  const _transactionsFetchStatus = useSelector(selectTxFetchStatus)
  const _rulesFetchStatus = useSelector(selectRulesFetchStatus)
  const _acctFetchStatus = useSelector(selectAcctFetchStatus)

  useEffect(() => {
    if (_transactionsFetchStatus === wdRequestStatusFetch) {
      _dispatch(txFetch())
    }
    if (_rulesFetchStatus === wdRequestStatusFetch) {
      _dispatch(rulesFetch())
    }
    if (_acctFetchStatus === wdRequestStatusFetch) {
      _dispatch(acctFetch())
    }
  }, [_dispatch, _acctFetchStatus, _transactionsFetchStatus, _rulesFetchStatus])

  countReturn = countReturn + 1

  return (
    <RenderWhenReady status={_status} className="container-fluid">
      <>
        <RenderCount
          componentName="App"
          countTotal={{ actual: countTotal, min: 8, max: 14 }}
          countReturn={{ actual: countReturn, min: 8, max: 10 }}
        />
        <Home />
      </>
    </RenderWhenReady>
  )
}
