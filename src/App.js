import React, { useEffect } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import {
  transactionsFetch,
  selectActiveTransactionId,
  Transactions,
  setRefresh
} from 'features/transactions'
import { RuleCreate, rulesFetch } from 'features/rules'
import { requestStatusNames, requestStatusStates } from 'features/requestStatus'
import { RenderWhenReady } from 'features/requestStatus'
// import { ContainerFluid } from 'components/ContainerFluid'
import { isNilOrEmpty } from 'lib/isNilOrEmpty'
import { useRuleEditSet } from 'features/rules/useRuleEditSet'
import { selectRequestStatus } from 'features/requestStatus'
import * as R from 'ramda'

// eslint-disable-next-line
import { green, yellow, red } from 'logger'
// eslint-disable-next-line
import { RenderCount } from 'components/RenderCount'

let countTotal = 0
let countReturn = 0

export const App = () => {
  countTotal = countTotal + 1

  const dispatch = useDispatch()

  const activeTransactionId = useSelector(selectActiveTransactionId)

  const status = useSelector((state) =>
    selectRequestStatus(
      [
        requestStatusNames.rulesFetchStatus,
        requestStatusNames.transactionsFetchStatus
      ],
      state
    )
  )

  useEffect(() => {
    if (
      R.includes(status, [
        requestStatusStates.idle,
        requestStatusStates.refresh
      ])
    ) {
      dispatch(transactionsFetch())
      dispatch(rulesFetch())
      dispatch(setRefresh(false))
    }
  }, [dispatch, status])

  useRuleEditSet(activeTransactionId)

  countReturn = countReturn + 1

  return (
    <RenderWhenReady
      status={status}
      className="container-fluid"
    >
      <>
        <RenderCount
          componentName="App"
          countTotal={{ actual: countTotal, min: 8, max: 14 }}
          countReturn={{ actual: countReturn, min: 8, max: 10 }}
        />
        {isNilOrEmpty(activeTransactionId) ? <Transactions /> : <RuleCreate />}
      </>
    </RenderWhenReady>
  )
}
