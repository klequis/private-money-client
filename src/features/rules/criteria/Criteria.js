import React from 'react'
import { useSelector } from 'react-redux'
import { CriterionEdit } from './CriterionEdit'
import { selectRuleEditCriteria } from 'features/ruleEdit'
import { Button } from 'components/Button'
import styled from 'styled-components'

// eslint-disable-next-line
import { green, redf, yellow, purple } from 'logger'
import { RenderCount } from 'components/RenderCount'

const ButtonRow = styled.div`
  display: flex;
  padding-bottom: 16px;
  align-items: center;
`

const H4 = styled.h4`
  margin-right: 12px;
  margin-bottom: 0;
`

const Btn = styled(Button)`
  margin-right: 12px;
`

let countTotal = 0
let countReturn = 0

export const Criteria = () => {
  countTotal = countTotal + 1

  const criteria = useSelector(selectRuleEditCriteria)
  const _handleButtonClick = () => {}

  if (!criteria) {
    return null
  }

  countReturn = countReturn + 1
  return (
    <div id="Criteria">
      {/* <RenderCount
        componentName="Criteria"
        countTotal={{ actual: countTotal, min: 2, max: 2 }}
        countReturn={{ actual: countReturn, min: 2, max: 2 }}
      /> */}
      <ButtonRow id="Criteria.Row">
        <H4>Criteria</H4>
        <Btn onClick={_handleButtonClick}>Add</Btn>
        <Btn onClick={_handleButtonClick}>Reset</Btn>
      </ButtonRow>

      {criteria.map((c) => (
        <CriterionEdit key={c._id} criterion={c} />
      ))}
    </div>
  )
}
