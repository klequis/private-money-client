import React from 'react'
import { useSelector } from 'react-redux'
import { selectRuleEditActions } from 'features/rules'
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
          const { _id, field, actionType } = a
          if (field === tFields.description.name) {
            return (
              <RenameDescription
                key={_id}
                actionId={_id}
                minChars={3}
                maxWidth={10}
              />
            )
          } else if (actionType === actionTypes.categorize.name) {
            return <Categorize key={_id} action={a} minChars={3} />
          } else {
            return <ActionEdit key={_id} action={a} />
          }
        })}
      </Wrapper>
    </div>
  )
}
