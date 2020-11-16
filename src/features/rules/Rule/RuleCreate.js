import React from 'react'
import { Rule } from './Rule'
import { CriteriaResults } from 'features/criteriaResults'
// import { RenderCount } from 'components/RenderCount'
import { ContainerFluid } from 'components/ContainerFluid'
import styled from 'styled-components'
import { selectRuleEditIsTmpRule } from 'features/ruleEdit'
import { useSelector } from 'react-redux'

import Button from 'components/Button'

// eslint-disable-next-line
import { purple, green, redf, yellow, blue } from 'logger'

let count = 0

const H2 = styled.h2`
  margin-bottom: 0;
`

export const RuleCreate = React.memo(() => {
  count = count + 1
  const isTmpRule = useSelector(selectRuleEditIsTmpRule)
  return (
    <ContainerFluid id="RuleCreates">
      {/* <RenderCount 
        componentName='RuleCreates' 
        countTotal={{ actual: count, min: 1, max: 1 }}
      /> */}
      <div>
        {isTmpRule ? <H2>Create Rule</H2> : <H2>Edit Rule</H2>}
        <Rule />
      </div>
      <div>
        <CriteriaResults />
      </div>
    </ContainerFluid>
  )
})
