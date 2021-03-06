import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { TextEdit } from 'components/TextEdit'
import * as R from 'ramda'
import { ruleEditActionUpdate } from 'features/rules'
import { txFields } from 'features/tx'
import styled from 'styled-components'

// eslint-disable-next-line
import { green, redf, purple } from 'logger'

const CategorizeDiv = styled.div`
  margin-right: 0.25rem;
  margin-left: 0.25rem;
`

export const Categorize = ({ action, minChars }) => {
  const [_action, _setAction] = useState(action)
  const { category1, category2 } = _action

  const _dispatch = useDispatch()

  const _handleEvent = (event) => {
    const { name, value } = event.target
    const newAction = R.mergeRight(_action, { [name]: value })
    _setAction(newAction)
    _dispatch(ruleEditActionUpdate(newAction))
  }

  return (
    <>
      <CategorizeDiv>
        <div>Category 1:</div>
        <TextEdit
          disabled={false}
          name={txFields.category1.name}
          labelText={txFields.category1.description}
          value={category1}
          minChars={minChars}
          onBlur={_handleEvent}
          onChange={_handleEvent}
        />
      </CategorizeDiv>
      <CategorizeDiv>
        <div>Category 2:</div>
        <TextEdit
          disabled={false}
          name={txFields.category2.name}
          labelText={txFields.category2.description}
          value={category2}
          minChars={minChars}
          onBlur={_handleEvent}
          onChange={_handleEvent}
        />
      </CategorizeDiv>
    </>
  )
}
