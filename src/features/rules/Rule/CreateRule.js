import React from 'react'
import Rule from './Rule'
import { CriteriaResults } from 'features/criteriaResults'
// import RenderCount from 'components/RenderCount'
import styled from 'styled-components'

// eslint-disable-next-line
import { purple, green, redf, yellow, blue } from 'logger'

const CreateRuleDiv = styled.div`
  display: flex;
  width: 100%;
  background-color: white;

`

let count = 0

export const CreateRule = React.memo(() => {
  purple('CreateRule', 'START')
  count = count + 1
  return (
    <CreateRuleDiv id="CreateRules">
      {/* <RenderCount 
        componentName='CreateRules' 
        countTotal={{ actual: count, min: 1, max: 1 }}
      /> */}
      <div style={{ backgroundColor: 'blue' }}>
        <h2>Create Rule</h2>
        <Rule />
      </div>
      <div style={{ backgroundColor: 'green' }}>
        <CriteriaResults />
      </div>
    </CreateRuleDiv>
  )
})
