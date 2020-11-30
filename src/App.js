import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RenderWhenReady } from 'components/RenderWhenReady'
// import { ContainerFluid } from 'components/ContainerFluid'
import { isNilOrEmpty } from 'lib/isNilOrEmpty'
import { useRuleEditSet } from 'features/rules/useRuleEditSet'
import { RuleCreate, rulesFetch } from 'features/rules'
import { txFetch, TxTbl } from 'features/tx'
import {
  selectActiveTransactionId,
  selectTransactionsFetchStatus,
  selectRulesFetchStatus,
  selectRequestStatus,
  // tmp
  selectCriteriaResultsFetchStatus
} from 'features/selectors'

import {
  wdRequestStatusFetch,
  wdRulesFetchStatus,
  wdTxFetchStatus
} from 'appWords'

// eslint-disable-next-line
import { green, yellow, red, purple } from 'logger'
// eslint-disable-next-line
import { RenderCount } from 'components/RenderCount'

let countTotal = 0
let countReturn = 0

export const App = () => {

  const a = useSelector(selectCriteriaResultsFetchStatus)
  green('a', a)
  return <h1>App</h1>
  purple('App', 'render')
  countTotal = countTotal + 1

  const dispatch = useDispatch()

  const activeTransactionId = useSelector(selectActiveTransactionId)

  const status = useSelector((state) =>
    selectRequestStatus([wdRulesFetchStatus, wdTxFetchStatus], state)
  )
  const transactionsFetchStatus = useSelector(selectTransactionsFetchStatus)
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

  return <h1>App</h1>
  // return (
  //   <RenderWhenReady
  //     status={status}
  //     className="container-fluid"
  //   >
  //     <>
  //       <RenderCount
  //         componentName="App"
  //         countTotal={{ actual: countTotal, min: 8, max: 14 }}
  //         countReturn={{ actual: countReturn, min: 8, max: 10 }}
  //       />
  //       {isNilOrEmpty(activeTransactionId) ? <TxTbl /> : <RuleCreate />}
  //     </>
  //   </RenderWhenReady>
  // )
}
