import React from 'react'
import { useSelector } from 'react-redux'
import CriterionEdit from './CriterionEdit'
import {
  selectRuleCriteria,
  selectRuleEditCriteria
} from 'features/rules/rulesSlice'
import isTmpRule from 'lib/isTmpRule'
// import styles from '../Rules.module.css'
// import Form from 'react-bootstrap/Form'
import Button from 'components/Button'
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import styled from 'styled-components'

// eslint-disable-next-line
import { green, redf, yellow } from 'logger'


const Row = styled.div`
  display: flex;
  align-items: center;
  background-color: red;
`

const Criteria = ({ ruleId }) => {
  const criteria = useSelector((state) => {
    if (isTmpRule(ruleId)) {
      return selectRuleEditCriteria(state)
    } else {
      return selectRuleCriteria(ruleId, state)
    }
  })

  if (!criteria) {
    return null
  }
  return (
    <div id="Criteria">
      <Row id="Criteria.Row">
          <h4>Criteria</h4>
          <Button>Add</Button>
          <Button>Reset</Button>
      </Row>

        {criteria.map((c) => (
          <CriterionEdit key={c._id} criterion={c} />
        ))}
    </div>
  )
}

export default Criteria
