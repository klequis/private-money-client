import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import {
  selectActiveTransaction
} from 'features/transactions/transactionsSlice'
import RuleView from './RuleView'
import RuleTmp from './RuleTmp'

// eslint-disable-next-line
import { green } from 'logger'

// const _ruleTmpCreate = (tmpId) => {
//   ruleTmpCreate(tmpId)
// }

// const _ruleTmpUpdate = () => {}

// const _ruleTmpDelete = () => {}

// const _ruleCreate = () => {}

// const _ruleDelete = () => {}

// const _ruleUpdate = () => {}



const Rules = () => {
  const activeTransaction = useSelector(selectActiveTransaction)
  const { ruleIds } = activeTransaction
  const [_ruleIds, _setRuleIds] = useState(ruleIds)

  useEffect(() => {
    // if (_ruleIds === undefined) {
    //   // const tmpId = ruleTmpMakeId()
    //   // const ruleIds = R.append(tmpId, _ruleIds)
    //   // _setRuleIds(ruleIds)
    // } else {
      const { ruleIds } = activeTransaction
      _setRuleIds(ruleIds)
    // }
  }, [_ruleIds, activeTransaction])

  /*
      If it is a tmp rule than show RuleEdit
      If it is an existing rule than show RuleView
  */

  // if ruleIds is undefiend then there will be no
  // rules to map so just render TmpRule
  if (ruleIds === undefined) {
    return <RuleTmp />
  }

  /*
      - if there is an array of 1 or more ruleids then map them
      - if the id of the rule matches the one in ruleEdit than it 
        will be shown in edit mode, if not, view mode
  */
  return (
    <>
      {_ruleIds !== undefined
        ? _ruleIds.map((id) => {

            return <RuleView key={id} ruleId={id} />
          })
        : null}
    </>
  )
}

export default Rules
