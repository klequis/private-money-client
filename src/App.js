import React, { useEffect } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import {
  transactionsFetch,
  Transactions,
} from 'features/transactions'
import { 
  RuleCreate,
  rulesFetch,
} from 'features/rules'
import { 
  
  requestStatusNames, 
  requestStatusStates,
} from 'globalConstants'
import {
  RenderWhenReady
} from 'components/RenderWhenReady'
// import { ContainerFluid } from 'components/ContainerFluid'
import { isNilOrEmpty } from 'lib/isNilOrEmpty'
import { useRuleEditSet } from 'features/rules/useRuleEditSet'
import * as R from 'ramda'

import {
  selectActiveTransactionId,
  selectRequestStatus
} from 'features/selectors'

// eslint-disable-next-line
import { green, yellow, red } from 'logger'
// eslint-disable-next-line
import { RenderCount } from 'components/RenderCount'

let countTotal = 0
let countReturn = 0

export const App = () => {

  green('App: requestStatusNames', requestStatusNames)
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
    green('App: status', status)  
    if (
      R.includes(status, [
        requestStatusStates.idle,
        requestStatusStates.refresh
      ])
    ) {
      green('-----------------------', '-')
      dispatch(transactionsFetch())
      dispatch(rulesFetch())
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
