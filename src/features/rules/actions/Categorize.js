import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { TextEdit } from 'components/TextEdit'
import * as R from 'ramda'
import { ruleEditActionUpdate } from 'features/ruleEdit'
import { transactionFields as tFields } from 'features/transactions'
// import styled from 'styled-components'

// eslint-disable-next-line
import { green, redf, purple } from 'logger'

export const Categorize = ({ action, minChars }) => {
  const [_action, _setAction] = useState(action)
  const { category1, category2 } = _action

  const dispatch = useDispatch()

  const _handleEvent = (event) => {
    const { name, value } = event.target
    const { type: eventType } = event
    console.group('_handleEvent')
    const newAction = R.mergeRight(_action, { [name]: value })
    console.groupEnd()
    _setAction(newAction)
    // if (eventType === 'blur') {
      dispatch(ruleEditActionUpdate(newAction))
    // }
  }

  return (
    <>
      <TextEdit
        disabled={false}
        name={tFields.category1.name}
        labelText='Category 1'
        value={category1}
        minChars={minChars}
        onBlur={_handleEvent}
        onChange={_handleEvent}
      />
      <TextEdit
        disabled={false}
        name={tFields.category2.name}
        labelText='Category 2'
        value={category2}
        minChars={minChars}
        onBlur={_handleEvent}
        onChange={_handleEvent}
      />
    </>
  )
}
