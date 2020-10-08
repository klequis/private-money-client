import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
  selectActiveTransaction
} from 'features/transactions/transactionsSlice'
import { setRuleEdit } from 'features/rules/rulesSlice'
import RuleEdit from './RuleEdit'

import ruleTmpMakeId from 'lib/ruleTmpMakeId'
import { ruleTmpMake } from './ruleTmpMake'

// eslint-disable-next-line
import { green, redf, yellow, blue, purple } from 'logger'

const RuleTmp = () => {
  // eslint-disable-next-line
  // const [_tmpRuleId, _setTmpRuleId] = useState(ruleTmpMakeId())
  // const dispatch = useDispatch()
  // const transaction = useSelector(selectActiveTransaction)
  // const { origDescription /*, date */ } = transaction
  // useEffect(() => {
  //   const tmpRule = ruleTmpMake(_tmpRuleId, origDescription)
  //   green('tmpRule', tmpRule)
  //   dispatch(setRuleEdit(tmpRule))
  // }, [_tmpRuleId, origDescription, setRuleEdit, dispatch])

  // return <RuleEdit ruleId={_tmpRuleId} />
  return <h1>hi</h1>
}

export default RuleTmp