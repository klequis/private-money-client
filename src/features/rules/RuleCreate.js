import React from 'react'
import { Rule } from './Rule'
import { CriteriaResults } from 'features/criteriaResults'
import { ContainerFluid } from 'components/ContainerFluid'

// eslint-disable-next-line
import { purple, green, redf, yellow, blue } from 'logger'
// eslint-disable-next-line
import { RenderCount } from 'components/RenderCount'

let countTotal = 0
let countReturn = 0

export const RuleCreate = React.memo(() => {
  countTotal = countTotal + 1

  countReturn = countReturn + 1
  return (
    <ContainerFluid id="RuleCreates">
      <RenderCount
        componentName="RuleCreates"
        countTotal={{ actual: countTotal, min: 1, max: 1 }}
        countReturn={{ actual: countReturn, min: 8, max: 10 }}
      />
      <div>
        <Rule />
      </div>
      <div>
        <CriteriaResults />
      </div>
    </ContainerFluid>
  )
})
