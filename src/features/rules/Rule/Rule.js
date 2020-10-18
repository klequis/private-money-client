import React from 'react'
import { useSelector } from 'react-redux'
import Criteria from './Criteria'

import Actions from './Actions'
import Button from 'components/Button'
import RuleId from './RuleId'
import { selectRuleEditId } from 'features/ruleEdit/ruleEditSlice'
import styled from 'styled-components'
// eslint-disable-next-line
import { green, purple } from 'logger'
import RenderCount from 'components/RenderCount'

const RuleDiv = styled.div``

let countTotal = 0
let countReturn = 0

const Rule = () => {
  countTotal = countTotal + 1

  const ruleId = useSelector(selectRuleEditId)

  const _handleSaveEditButtonClick = () => { 
    // 1. call ruleEditSave.ruleEditSave 

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

