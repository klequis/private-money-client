import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import TextEdit from 'components/TextEdit'
import { updateRuleEditAction } from 'features/rules/rulesSlice'
import { actionFields } from 'globalConstants'
import * as R from 'ramda'
// import styled from 'styled-components'

// eslint-disable-next-line
import { purple, green, redf } from 'logger'


// const Wrapper = styled.div`
//   @media (min-width: 601px) {

//   }

//   @media (max-width: 600px) {

//   }
// `

// const Wrapper = styled.div`
  
//   width: 100%;
  
// `
// background-color: blue;
// flex-basis: 33.333333%;

const RenameDescription = ({ action }) => {
  purple('>>> RenameDescription', 'render')
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
    <TextEdit
      name={actionFields.replaceWithValue.name}
      labelText="Rename Description As"
      value={replaceWithValue}
      onChange={_handleEvent}
      onBlur={_handleEvent}
      minWidth={300}
      minChars={1}
    />
  )
}

export default RenameDescription

/*
return (
  <div>
    <label>Rename: </label>
    <TextEdit
      name={actionFields.replaceWithValue.name}
      value={replaceWithValue}
      onChange={_handleEvent}
      onBlur={_handleEvent}
      minWidth={300}
      minChars={1}
    />
  </div>
)

*/