import React from 'react'
import { Rule } from './Rule'
import { CriteriaResults } from 'features/criteriaResults'
import { ContainerFluid } from 'components/ContainerFluid'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { selectRuleEditIsTmpRule } from 'features/selectors'

// eslint-disable-next-line
import { purple, green, redf, yellow, blue } from 'logger'
// eslint-disable-next-line
import { RenderCount } from 'components/RenderCount'

let countTotal = 0
let countReturn = 0

const H2 = styled.h2`
  margin-bottom: 0;
`

export const RuleCreate = React.memo(() => {
  countTotal = countTotal + 1
  const _isTmpRule = useSelector(selectRuleEditIsTmpRule)
  countReturn = countReturn + 1
  return (
    <ContainerFluid id="RuleCreates">
      <RenderCount 
        componentName='RuleCreates' 
        countTotal={{ actual: countTotal, min: 1, max: 1 }}
        countReturn={{ actual: countReturn, min: 8, max: 10 }}
      />
      <div>
        {_isTmpRule ? <H2>Create Rule</H2> : <H2>Edit Rule</H2>}
        <Rule />
      </div>
      <div>
        <CriteriaResults />
      </div>
    </ContainerFluid>
  )
})
