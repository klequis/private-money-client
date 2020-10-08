import React from 'react'
import { useSelector } from 'react-redux'
import CriterionEdit from './CriterionEdit'
import {
  selectRuleCriteria,
  selectRuleEditCriteria
} from 'features/rules/rulesSlice'
import isTmpRule from 'lib/isTmpRule'
import Button from 'components/Button'
import styled from 'styled-components'
import { ICriterion } from 'interfaces'

// eslint-disable-next-line
import { green, redf, yellow, purple } from 'logger'

const Row = styled.div`
  display: flex;
  align-items: center;
  background-color: red;
`

const Criteria = ({ ruleId }: { ruleId: string }) => {
  purple('>>> Criteria', 'render')
  const criteria = useSelector((state) => {
    if (isTmpRule(ruleId)) {
      return selectRuleEditCriteria(state)
    } else {
      return selectRuleCriteria(ruleId, state)
    }
  })

  const _handleButtonClick = () => {}

  if (!criteria) {
    return null
  }
  return (
    <div id="Criteria">
      <Row id="Criteria.Row">
        <h4>Criteria</h4>

        <Button onClick={_handleButtonClick}>Add</Button>
        <Button onClick={_handleButtonClick}>Reset</Button>
      </Row>

      {criteria.map((c: ICriterion) => (
        <CriterionEdit key={c._id} criterion={c} />
      ))}
    </div>
  )
}

export default Criteria
