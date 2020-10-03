import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import TextEdit from 'components/TextEdit'
import * as R from 'ramda'
import { updateRuleEditAction } from 'features/rules/rulesSlice'
import { /*actionTypes,*/ transactionFields as fields } from 'globalConstants'
import styled from 'styled-components'

// eslint-disable-next-line
import { green, redf } from 'logger'

const Wrapper = styled.div`
  display: flex;
  background-color: red;
`

const Categorize = ({ action }) => {
  const [_action, _setAction] = useState(action)
  const { category1, category2 } = _action
  const dispatch = useDispatch()
  

  

  const _handleEvent = (event) => {
    const { name, value } = event.target
    const { type: eventType } = event
    // console.group('_handleEvent')
    // green('_handleEvent: name', name)
    // green('_handleEvent: value', value)
    // green('_handleEvent: eventType', eventType)
    const newAction = R.mergeRight(_action, { [name]: value })
    
    _setAction(newAction)

    if (eventType === 'blur') {
      // green('typeIsBlur')
      dispatch(updateRuleEditAction(newAction))
    }
    // console.groupEnd()
  }

  

  return (
    <Wrapper>
      <div>
        <label>{fields.category1.description}</label>
        <TextEdit
          name={fields.category1.name}
          value={category1}
          onBlur={_handleEvent}
          onChange={_handleEvent}
          // minWidth={300}
        />
      </div>
      <div>
        <label>{fields.category2.description}</label>
        <TextEdit
          name={fields.category2.name}
          value={category2}
          onBlur={_handleEvent}
          onChange={_handleEvent}
          // minWidth={300}
        />
      </div>
    </Wrapper>
  )
}

export default Categorize
