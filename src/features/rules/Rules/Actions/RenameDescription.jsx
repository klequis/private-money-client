import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import TextEdit from 'components/TextEdit'
import { updateRuleEditAction } from 'features/rules/rulesSlice'
import { actionFields } from 'globalConstants'
import * as R from 'ramda'
import styled from 'styled-components'

// eslint-disable-next-line
import { green, redf } from 'logger'


// const Wrapper = styled.div`
//   @media (min-width: 601px) {

//   }

//   @media (max-width: 600px) {

//   }
// `

const Wrapper = styled.div`
  background-color: blue;
  width: 100%;
  flex-basis: 33.333333%;
`


const RenameDescription = ({ action }) => {

  const [_action, _setAction] = useState(action)
  const { replaceWithValue } = _action
  const dispatch = useDispatch()

  const _handleEvent = (event) => {
    const { value, type } = event.target
    const newAction = R.mergeRight(_action, { replaceWithValue: value })
    _setAction(newAction)
    if (type === 'blur') {
      dispatch(updateRuleEditAction(newAction))
    }
  }

  return (
    <Wrapper>
      <label>Rename: </label>
      <TextEdit
        name={actionFields.replaceWithValue.name}
        value={replaceWithValue}
        onChange={_handleEvent}
        onBlur={_handleEvent}
        minWidth={300}
        minChars={1}
      />
    </Wrapper>
  )
}

export default RenameDescription
