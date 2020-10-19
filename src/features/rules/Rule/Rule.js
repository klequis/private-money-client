import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Criteria from './Criteria'
import Actions from './Actions'
import Button from 'components/Button'
import RuleId from './RuleId'
import { 
  selectRuleEdit, 
} from 'features/ruleEdit/ruleEditSlice'
import { 
  ruleUpdate,
  ruleCreate
} from 'features/ruleEdit/ruleEditSlice'
import styled from 'styled-components'
import { isTmpRule } from 'fields/rules'

// try
import {
  fetchCriteriaResults,
} from 'features/criteriaResults/criteriaResultsSlice'

// eslint-disable-next-line
import { green, purple } from 'logger'
import RenderCount from 'components/RenderCount'

const RuleDiv = styled.div``

let countTotal = 0
let countReturn = 0

const Rule = () => {
  countTotal = countTotal + 1

  const ruleEdit = useSelector(selectRuleEdit)

  const dispatch = useDispatch()
  if (!ruleEdit) {
    return null
  }
  
  const { _id: ruleId } = ruleEdit

  const _handleSaveEditButtonClick = () => { 
    // green('Rule: ruleEdit', ruleEdit)
    if (isTmpRule(ruleEdit)) {
      
      dispatch(ruleCreate(ruleEdit))
      green('CREATED')
    } else {
      dispatch(ruleUpdate(ruleEdit))
      green('UPDATED')
    }
  }

  

  countReturn = countReturn + 1
  return (
    <>
      <RuleDiv id="Rule">
        {/* <RenderCount
          componentName="Rule"
          countTotal={{ actual: countTotal, min: 1, max: 2 }}
          countReturn={{ actual: countReturn, min: 2, max: 2 }}
        /> */}
        <RuleId ruleId={ruleId} />
        <Button onClick={_handleSaveEditButtonClick}>Save</Button>
        <Criteria />
        <Actions />
      </RuleDiv>
      
    </>
  )
}

export default Rule

