import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { txFields } from 'features/tx'
import styled from 'styled-components'
import { updateFilters } from 'features/txTbl'
import { useDebounce } from 'use-debounce'

// eslint-disable-next-line
import { green, purple } from 'logger'
import { render } from '@testing-library/react'

// const TH = styled.th`
//   width: 100%;

// `

const TextInput = styled.input`
  
`
/*
  width: 90%;
  display: flex;
  flex-flow: column now;
*/

let renderCount = 0

export const TxColHead = ({ fieldName }) => {
  const dispatch = useDispatch()

  const [_value, _setValue] = useState('')
  const [debouncedValue] = useDebounce(_value, 1000)
  // green('typeof debouncedValue', typeof debouncedValue)
  // green('debouncedValue', debouncedValue)
  // useEffect(() => {
  //   fieldName === txFields.omit.name ? _setValue('No') : _setValue('')
  // }, [fieldName])

  const _valueChanged = (event) => {
    // const name = event.target.name
    const value = event.target.value
    // if (name === txFields.omit.name) {
    // value === 'true' ? _setValue(true) : _setValue(false)
    // } else {
    _setValue(value)
    
    
    // }
  }

  useEffect(() => {
    if (debouncedValue) {
      purple('debouncedValue', debouncedValue)
      dispatch(updateFilters({ name: fieldName, value: debouncedValue }))
    }
  }, [debouncedValue, dispatch, fieldName])

  // console.group('ColumnHeading')
  // console.groupEnd()
  renderCount = renderCount + 1
  // green('renderCount', renderCount)
  return (
    
    
    <th>
      <div>
        {fieldName === txFields.omit.name ? (
          ''
        ) : (
            // <input
            //   id={fieldName}
            //   type="text"
            //   name={fieldName}
            //   value={_value}
            //   onChange={_valueChanged}
            // />
            <>
            count: {renderCount}
            <TextInput
              id={fieldName}
              name={fieldName}
              placeholder="filter"
              onChange={_valueChanged}
              type="text"
              value={_value}
            />
            </>
          )}
        <div>{fieldName}</div>
        {/* <SortButtons updateSort={_updateSort} fieldName={fieldName} /> */}
      </div>
    </th>
  )

}

