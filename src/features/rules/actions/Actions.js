import React from 'react'
import { useSelector } from 'react-redux'
import { selectRuleEditActions } from 'features/ruleEdit'
import styled from 'styled-components'

// eslint-disable-next-line
import { green, redf, purple } from 'logger'
import { RenderCount } from 'components/RenderCount'
import { ActionComponent } from './ActionComponent'

const Wrapper = styled.div`
  display: flex;
`
/*
display: flex;
  @media (min-width: 601px) {
    
  }
  @media (max-width: 600px) {
    flex-direction: column;
    
  }
*/
// padding-top: 15px;
// display: flex;
// width: 100%;

let countTotal = 0
let countReturn = 0

export const Actions = () => {

  countTotal = countTotal + 1

  const actions = useSelector((state) => selectRuleEditActions(state))

  

  if (!actions) {
    return null
  }

  countReturn = countReturn + 1
  return (
    <div>
      <h4>Actions</h4>
      <RenderCount
        componentName="Actions"
        countTotal={{ actual: countTotal, min: 2, max: 2 }}
        countReturn={{ actual: countReturn, min: 2, max: 2 }}
      />

      <Wrapper>
        {actions.map((a) => {
          return (
            <ActionComponent key={`${a._id}_component`} action={a} />
          )
        })}
      </Wrapper>
    </div>

  )
}
