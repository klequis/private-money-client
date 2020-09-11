import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import shortid from 'shortid'
import {
  selectActiveTransaction
} from 'features/transactions/transactionsSlice'
import { setRuleEdit } from 'features/rules/rulesSlice'
import RuleEdit from './RuleEdit'

// eslint-disable-next-line
import { green, redf, yellow, blue } from 'logger'

const makeTmpRuleId = () => `tmp_${shortid.generate()}`

const makeTmpRule = (tmpId, origDescription, date) => {
  return {
    _id: tmpId,
    criteria: [
      {
        _id: `tmp_${shortid.generate()}`,
        field: 'description',
        operation: 'equals',
        value: origDescription,
        active: true,
      },
      {
        _id: `tmp_${shortid.generate()}`,
        field: 'date',
        operation: 'equals',
        value: date,
        active: false
      }
    ],
    actions: [
      {
        _id: `tmp_${shortid.generate()}`,
        actionType: 'replaceAll',
        field: 'description',
        replaceWithValue: origDescription
      },
      {
        _id: `tmp_${shortid.generate()}`,
        actionType: 'categorize',
        category1: '',
        category2: '',
      }
    ]
  }
}

const RuleTmp = () => {
  // eslint-disable-next-line
  const [_tmpRuleId, _setTmpRuleId] = useState(makeTmpRuleId())
  const dispatch = useDispatch()
  const transaction = useSelector(selectActiveTransaction)
  const { origDescription /*, date */ } = transaction
  useEffect(() => {
    const tmpRule = makeTmpRule(_tmpRuleId, origDescription)
    // green('tmpRule', tmpRule)
    dispatch(setRuleEdit(tmpRule))
  }, [_tmpRuleId, dispatch, origDescription])

  return <RuleEdit ruleId={_tmpRuleId} />
  // return <h1>hi</h1>
}

export default RuleTmp