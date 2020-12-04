import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RenderWhenReady } from 'components/RenderWhenReady'
// import { ContainerFluid } from 'components/ContainerFluid'
import { isNilOrEmpty } from 'lib/isNilOrEmpty'
import { useRuleEditSet } from 'features/rules/useRuleEditSet'
import { RuleCreate, rulesFetch } from 'features/rules'
import { txFetch, TxTbl } from 'features/tx'
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
  const dispatch = useDispatch()
  const activeTransactionId = useSelector(selectActiveTxId)
  const status = useSelector((state) =>
    selectRequestStatus([wdRulesFetchStatus, wdTxFetchStatus], state)
  )
  const transactionsFetchStatus = useSelector(selectTxFetchStatus)
  const rulesFetchStatus = useSelector(selectRulesFetchStatus)

  useEffect(() => {
    if (transactionsFetchStatus === wdRequestStatusFetch) {
      dispatch(txFetch())
    }
    if (rulesFetchStatus === wdRequestStatusFetch) {
      dispatch(rulesFetch())
    }
  }, [dispatch, transactionsFetchStatus, rulesFetchStatus])

  useRuleEditSet(activeTransactionId)
  countReturn = countReturn + 1

  return (
    <RenderWhenReady status={status} className="container-fluid">
      <>
        <RenderCount
          componentName="App"
          countTotal={{ actual: countTotal, min: 8, max: 14 }}
          countReturn={{ actual: countReturn, min: 8, max: 10 }}
        />
        {isNilOrEmpty(activeTransactionId) ? <TxTbl /> : <RuleCreate />}
      </>
    </RenderWhenReady>
  )
}
