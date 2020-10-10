import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
  selectActiveTransaction
} from 'features/transactions/transactionsSlice'
import { setRuleEdit } from 'features/rules/rulesSlice'
import RuleEdit from './RuleEdit'

import ruleTmpMakeId from 'lib/ruleTmpMakeId'
import { ruleTmpMake } from './ruleTmpMake'
import RenderCount from 'components/RenderCount'

// eslint-disable-next-line
import { green, redf, yellow, blue, purple } from 'logger'

let countTotal = 0
const countTotalExpected = 2
let countReturn = 0
const countReturnExpected = 2

const RuleTmp = React.memo(() => {
  countTotal = countTotal + 1
  // eslint-disable-next-line
  const [_tmpRuleId, _setTmpRuleId] = useState(ruleTmpMakeId())
  const dispatch = useDispatch()
  const transaction = useSelector(selectActiveTransaction)
  
  useEffect(() => {
    const _tmpRuleId = ruleTmpMakeId()
    const { origDescription /*, date */ } = transaction
    const tmpRule = ruleTmpMake(_tmpRuleId, origDescription)
    dispatch(setRuleEdit(tmpRule))
  }, [_tmpRuleId, dispatch, transaction])

  countReturn = countReturn + 1
  return (
    <div>
      <RenderCount
          name="RuleTmp"
          countTotal={countTotal}
          countTotalExpected={countTotalExpected}
          countReturn={countReturn}
          countReturnExpected={countReturnExpected}
        />
      <RuleEdit />
    </div>
  )
})

export default RuleTmp