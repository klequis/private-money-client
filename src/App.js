import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RenderWhenReady } from 'components/RenderWhenReady'
// import { ContainerFluid } from 'components/ContainerFluid'
import { isNilOrEmpty } from 'lib/isNilOrEmpty'
import { useRuleEditSet } from 'features/rules/useRuleEditSet'
import { RuleCreate, rulesFetch } from 'features/rules'
import { txFetch } from 'features/tx'
import { TxTbl } from 'features/txTbl'

import {
  selectActiveTxId,
  selectTxFetchStatus,
  selectRulesFetchStatus,
  selectRequestStatus
} from 'features/selectors'

import {
  wdRequestStatusFetch,
  wdRulesFetchStatus,
  wdTxFetchStatus
} from 'appWords'

/* eslint-disable */
import { green, yellow, red, purple } from 'logger'
import { RenderCount } from 'components/RenderCount'
/* eslint-enable */

let countTotal = 0
let countReturn = 0

export const App = () => {
  countTotal = countTotal + 1
  const _dispatch = useDispatch()
  const _activeTransactionId = useSelector(selectActiveTxId)
  const _status = useSelector((state) =>
    selectRequestStatus([wdRulesFetchStatus, wdTxFetchStatus], state)
  )
  const _transactionsFetchStatus = useSelector(selectTxFetchStatus)
  const _rulesFetchStatus = useSelector(selectRulesFetchStatus)

  useEffect(() => {
    if (_transactionsFetchStatus === wdRequestStatusFetch) {
      _dispatch(txFetch())
    }
    if (_rulesFetchStatus === wdRequestStatusFetch) {
      _dispatch(rulesFetch())
    }
  }, [_dispatch, _transactionsFetchStatus, _rulesFetchStatus])

  useRuleEditSet(_activeTransactionId)
  countReturn = countReturn + 1

  return (
    <RenderWhenReady status={_status} className="container-fluid">
      <>
        <RenderCount
          componentName="App"
          countTotal={{ actual: countTotal, min: 8, max: 14 }}
          countReturn={{ actual: countReturn, min: 8, max: 10 }}
        />
        {isNilOrEmpty(_activeTransactionId) ? <TxTbl /> : <RuleCreate />}
      </>
    </RenderWhenReady>
  )
}
