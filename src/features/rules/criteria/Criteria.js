import React from 'react'
import { useSelector } from 'react-redux'
import { CriterionEdit } from './CriterionEdit'
import { Button } from 'components/Button'
import styled from 'styled-components'
import { selectRuleEditCriteria } from 'features/selectors'

/* eslint-disable */
import { green, redf, yellow, purple } from 'logger'
import { RenderCount } from 'components/RenderCount'
/* eslint-enable */
let countTotal = 0
let countReturn = 0

const ButtonRowDiv = styled.div`
  display: flex;
  margin-bottom: 1rem;
  align-items: center;
`

const H4 = styled.h4`
  margin-right: 12px;
  margin-bottom: 0;
`

const Btn = styled(Button)`
  margin-right: 12px;
`

export const Criteria = () => {
  countTotal = countTotal + 1

  const _criteria = useSelector(selectRuleEditCriteria)

  const _handleButtonClick = () => {
    // TODO: not implemented yet
  }

  if (!_criteria) {
    return null
  }

  countReturn = countReturn + 1
  return (
    <div id="Criteria">
      <RenderCount
        componentName="Criteria"
        countTotal={{ actual: countTotal, min: 2, max: 2 }}
        countReturn={{ actual: countReturn, min: 2, max: 2 }}
      />
      <ButtonRowDiv id="Criteria.Row">
        <H4>Criteria</H4>
        <Btn onClick={_handleButtonClick}>Add</Btn>
      </ButtonRowDiv>

      {_criteria.map((c) => (
        <CriterionEdit key={c._id} criterion={c} />
      ))}
    </div>
  )
}
