import { useSelector, useDispatch } from 'react-redux'
import { ruleDelete, ruleEditClear, ruleEditSave } from 'features/rules'
import { txActiveIdClear } from 'features/tx'
import { RuleToolbar } from './RuleToolbar'
import { RuleId } from './RuleId'
import { Criteria, Actions } from 'features/rules'
import { selectRuleEdit } from 'features/selectors'
import { ContainerFluid } from 'components/ContainerFluid'
import { selectRuleEditIsTmpRule } from 'features/selectors'
import styled from 'styled-components'

/* eslint-disable */
import { green, purple, red } from 'logger'
import { RenderCount } from 'components/RenderCount'
/* eslint-enable */

let countTotal = 0
let countReturn = 0

const RuleDiv = styled.div`
  display: flex;
  align-items: center;
  margin-top: 16px;
  margin-bottom: 16px;
`

const H2 = styled.h2`
  margin-bottom: 0;
  margin-right: 0.25rem;
`

export const Rule = () => {
  countTotal = countTotal + 1
  const _isTmpRule = useSelector(selectRuleEditIsTmpRule)
  const _ruleEdit = useSelector(selectRuleEdit)
  const _dispatch = useDispatch()

  const { dirty, _id: ruleId } = _ruleEdit

  const _handleSaveClick = async () => {
    _dispatch(ruleEditSave())
  }

  const _handleCancelClick = () => {
    _dispatch(txActiveIdClear())
    _dispatch(ruleEditClear())
  }

  const _handleDeleteClick = () => {
    _dispatch(ruleDelete(ruleId))
  }

  countReturn = countReturn + 1
  return (
    <ContainerFluid>
      <RenderCount
        componentName="Rule"
        countTotal={{ actual: countTotal, min: 8, max: 14 }}
        countReturn={{ actual: countReturn, min: 8, max: 10 }}
      />
      <RuleId ruleId={ruleId} />
      <RuleDiv>
        {_isTmpRule ? <H2>Create Rule</H2> : <H2>Edit Rule</H2>}
        <RuleToolbar
          save={_handleSaveClick}
          cancel={_handleCancelClick}
          deleteRule={_handleDeleteClick}
          dirty={dirty}
        />
      </RuleDiv>
      <Criteria />
      <Actions />
    </ContainerFluid>
  )
}
