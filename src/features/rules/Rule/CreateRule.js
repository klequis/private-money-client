import React from 'react'
import Rule from './Rule'
import CriteriaResults from './CriteriaResults'
// import RenderCount from 'components/RenderCount'
import styled from 'styled-components'

// eslint-disable-next-line
import { purple, green, redf, yellow, blue } from 'logger'

const CreateRuleDiv = styled.div`
`

let count = 0

const CreateRule = React.memo(() => {
  count = count + 1
  return (
    <CreateRuleDiv id="CreateRules">
      <h2>Create Rule</h2>
      {/* <RenderCount 
        componentName='CreateRules' 
        countTotal={{ actual: count, min: 1, max: 1 }}
      /> */}
      <Rule />
      <CriteriaResults />
    </CreateRuleDiv>
  )
})

export default CreateRule
