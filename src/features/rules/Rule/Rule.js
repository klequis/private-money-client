import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  ruleEditSave,
  ruleEditClear,
} from 'features/rules'
import { txActiveIdClear } from 'features/tx'
import { RuleToolbar } from './RuleToolbar'
import { RuleId } from './RuleId'
import { Criteria, Actions } from 'features/rules'
import { selectRuleEdit } from 'features/selectors'
<<<<<<< HEAD
import { ContainerFluid } from 'components/ContainerFluid'
=======
import * as R from 'ramda'
>>>>>>> 24a0dcd34ec138f919de07aec8706ec010537fe9

/* eslint-disable */
import { green, purple, red } from 'logger'
import { RenderCount } from 'components/RenderCount'
/* eslint-enable */

let countTotal = 0
let countReturn = 0

export const Rule = () => {
  countTotal = countTotal + 1

  const _ruleEdit = useSelector(selectRuleEdit)
  const _dispatch = useDispatch()

  const _handleSaveClick = async () => {
    _dispatch(ruleEditSave())
  }

  const _handleCancelClick = () => {
    _dispatch(txActiveIdClear())
    _dispatch(ruleEditClear())
  }

  const _handleDeleteClick = () => {
    // TODO: not implemented yet
  }

  const { dirty, _id: ruleId } = _ruleEdit

  countReturn = countReturn + 1
  return (
    <ContainerFluid>
      <RenderCount
        componentName="Rule"
        countTotal={{ actual: countTotal, min: 8, max: 14 }}
        countReturn={{ actual: countReturn, min: 8, max: 10 }}
      />
      <RuleId ruleId={ruleId} />
      <RuleToolbar
        save={_handleSaveClick}
        cancel={_handleCancelClick}
        deleteRule={_handleDeleteClick}
        dirty={dirty}
      />
      <Criteria />
      <Actions />
    </ContainerFluid>
  )
}
