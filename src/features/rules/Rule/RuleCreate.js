import React from 'react'
import Rule from './Rule'
import { CriteriaResults } from 'features/criteriaResults'
// import RenderCount from 'components/RenderCount'
import styled from 'styled-components'

// eslint-disable-next-line
import { purple, green, redf, yellow, blue } from 'logger'

const RuleCreateDiv = styled.div`
  display: flex;
  width: 100%;


`
// background-color: white;

let count = 0

export const RuleCreate = React.memo(() => {
  count = count + 1
  return (
    <RuleCreateDiv id="RuleCreates">
      {/* <RenderCount 
        componentName='RuleCreates' 
        countTotal={{ actual: count, min: 1, max: 1 }}
      /> */}
      <div>
        <h2>Create Rule</h2>
        <Rule />
      </div>
      <div>
        <CriteriaResults />
      </div>
    </RuleCreateDiv>
  )
})
