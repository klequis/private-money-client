import React from 'react'
import { useSelector } from 'react-redux'
import { selectRuleEditActions } from 'features/ruleEdit/ruleEditSlice'
import ActionEdit from './ActionEdit'
import isTmpRule from 'lib/isTmpRule'
import RenameDescription from './RenameDescription'
import Categorize from './Categorize'
import { actionTypes, transactionFields as fields } from 'globalConstants'
import styled from 'styled-components'

// eslint-disable-next-line
import { green, redf, purple } from 'logger'
import RenderCount from 'components/RenderCount'

const Wrapper = styled.div`
  display: flex;
  @media (min-width: 601px) {
    
  }
  @media (max-width: 600px) {
    flex-direction: column;
    
  }
  background-color: orange;
`
// padding-top: 15px;
// display: flex;
// width: 100%;

let countTotal = 0
let countReturn = 0

const Actions = () => {

  countTotal = countTotal + 1

  const actions = useSelector((state) => selectRuleEditActions(state))

  const Control = ({ action }) => {
    if (action.field === fields.description.name) {
      return <RenameDescription key={action._id} action={action} minChars={3} />
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
      <RenderCount
        name="Actions"
        countTotal={{ actual: countTotal, min: 2, max: 2 }}
        countReturn={{ actual: countReturn, min: 2, max: 2 }}
      />
      <Wrapper>
        {actions.map((a) => {
          return (
            <Control key={a._id} action={a} />
          )
        })}
      </Wrapper>
    </div>

  )
}

export default Actions
