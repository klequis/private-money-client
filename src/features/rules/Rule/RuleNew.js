import React from 'react'
import styled from 'styled-components'
import { Criteria, Actions } from 'features/rules'

// eslint-disable-next-line
import { green, purple, red } from 'logger'
// eslint-disable-next-line
import { RenderCount } from 'components/RenderCount'

let countTotal = 0
let countReturn = 0

const RuleDiv = styled.div``

export const RuleNew = () => {
  return (
    <RuleDiv id="Rule">
      <RenderCount
        componentName="RuleNew"
        countTotal={{ actual: countTotal, min: 8, max: 14 }}
        countReturn={{ actual: countReturn, min: 8, max: 10 }}
      />
      <Criteria />
      <Actions />
    </RuleDiv>
  )
}
