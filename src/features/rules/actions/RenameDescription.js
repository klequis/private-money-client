import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { TextEdit } from 'components/TextEdit'
import { ruleEditActionUpdate } from 'features/ruleEdit'
import { actionFields } from 'features/rules'
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
// flex-basis: 33.333333%;

export const RenameDescription = ({ action }) => {
  const [_action, _setAction] = useState(action)
  const { replaceWithValue } = _action
  const dispatch = useDispatch()

  const _handleBlur = (event) => {
    const { value } = event.target
    const newAction = R.mergeRight(_action, { replaceWithValue: value })
    _setAction(newAction)
    dispatch(ruleEditActionUpdate(newAction))
  }

  return (
    <TextEdit
      disabled={false}
      name={actionFields.replaceWithValue.name}
      labelText="Rename Description As"
      initialValue={replaceWithValue}
      onBlur={_handleBlur}
      minWidth={300}
      minChars={1}
    />
  )
}
