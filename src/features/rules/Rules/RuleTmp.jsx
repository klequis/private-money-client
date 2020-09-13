import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import shortid from 'shortid'
import {
  selectActiveTransaction
} from 'features/transactions/transactionsSlice'
import { setRuleEdit } from 'features/rules/rulesSlice'
import RuleEdit from './RuleEdit'
import { operators, actionTypes, transactionFields as fields } from 'globalConstants'
import ruleTmpMakeId from 'lib/ruleTmpMakeId'

// eslint-disable-next-line
import { green, redf, yellow, blue } from 'logger'

const ruleTmpMake = (tmpId, origDescription, date) => {
  return {
    _id: tmpId,
    criteria: [
      {
        _id: `tmp_${shortid.generate()}`,
        field: fields.description.name,
        operation: operators.equals,
        value: origDescription,
        active: true,
      },
      {
        _id: `tmp_${shortid.generate()}`,
        field: fields.date.name,
        operation: operators.equals,
        value: date,
        active: false
      }
    ],
    actions: [
      {
        _id: `tmp_${shortid.generate()}`,
        actionType: actionTypes.replaceAll.name,
        field: fields.description.name,
        replaceWithValue: origDescription
      },
      {
        _id: `tmp_${shortid.generate()}`,
        actionType: actionTypes.categorize.name,
        category1: '',
        category2: '',
      }
    ]
  }
}

const RuleTmp = () => {
  // eslint-disable-next-line
  const [_tmpRuleId, _setTmpRuleId] = useState(ruleTmpMakeId())
  const dispatch = useDispatch()
  const transaction = useSelector(selectActiveTransaction)
  const { origDescription /*, date */ } = transaction
  useEffect(() => {
    const tmpRule = ruleTmpMake(_tmpRuleId, origDescription)
    // green('tmpRule', tmpRule)
    dispatch(setRuleEdit(tmpRule))
  }, [_tmpRuleId, dispatch, origDescription])

  return <RuleEdit ruleId={_tmpRuleId} />
  // return <h1>hi</h1>
}

export default RuleTmp