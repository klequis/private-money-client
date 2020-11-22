import React from 'react'
import { useSelector } from 'react-redux'
import { selectRuleEditActions } from 'features/ruleEdit'
import { ActionEdit } from './ActionEdit'
import { RenameDescription } from './RenameDescription'
import { Categorize } from './Categorize'
import { actionTypes } from 'features/rules'
import { transactionFields as tFields } from 'features/transactions'
import styled from 'styled-components'

// eslint-disable-next-line
import { green, redf, purple } from 'logger'
import { RenderCount } from 'components/RenderCount'

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

  const Component = ({ action }) => {
    if (action.field === tFields.description.name) {
      return (
        <RenameDescription
          key={action._id}
          actionId={action._id}
          minChars={3}
          maxWidth={10}
        />
      )
    } else if (action.actionType === actionTypes.categorize.name) {
      return <Categorize key={action._id} action={action} minChars={3} />
    } else {
      return <ActionEdit key={action._id} action={action} />
    }
  }

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
        {actions.map((a) => (
          <RenameDescription
            key={a._id}
            actionId={a._id}
            minChars={3}
            maxWidth={10}
          />
        ))}
      </Wrapper>
    </div>
  )
}

/*

      <Wrapper>
        {actions.map((a) => {
          return (
            // <Component key={a._id} action={a} />
            <RenameDescription key={a._id} actionId={a._id} minChars={3} maxWidth={10} />
          )
        })}
      </Wrapper>

      */
