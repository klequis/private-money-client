import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import TextEdit from 'components/TextEdit'
import * as R from 'ramda'
import { ruleEditActionUpdate } from 'features/ruleEdit/ruleEditSlice'
import { /*actionTypes,*/ transactionFields as fields } from 'globalConstants'
// import styled from 'styled-components'

// eslint-disable-next-line
import { green, redf, purple } from 'logger'

// const Wrapper = styled.div`
//   // display: flex;
  
//   width: 100%;
// `
// background-color: red;

const Categorize = ({ action, minChars }) => {
  const [_action, _setAction] = useState(action)
  const { category1, category2 } = _action
  const dispatch = useDispatch()




  const _handleEvent = (name, value, eventType) => {
    // const { name, value } = event.target
    // const { type: eventType } = event
    // console.group('_handleEvent')
    // green('_handleEvent: name', name)
    // green('_handleEvent: value', value)
    // green('_handleEvent: eventType', eventType)
    const newAction = R.mergeRight(_action, { [name]: value })

    _setAction(newAction)

    if (eventType === 'blur') {
      // green('typeIsBlur')
      dispatch(ruleEditActionUpdate(newAction))
    }
    // console.groupEnd()
  }


  return (
    <>
      <TextEdit
        name={fields.category1.name}
        labelText='Category 1'
        initialValue={category1}
        minChars={minChars}
        onBlur={_handleEvent}
        onChange={_handleEvent}
      // minWidth={300}
      />
      <TextEdit
        name={fields.category2.name}
        labelText='Category 2'
        initialValue={category2}
        minChars={minChars}
        onBlur={_handleEvent}
        onChange={_handleEvent}
      // minWidth={300}
      />
    </>
  )
}

export default Categorize

/*

return (
    <>
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
    </>
  )

*/