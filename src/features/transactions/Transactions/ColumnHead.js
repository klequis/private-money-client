import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { transactionFields as tFields } from 'features/transactions'
import styled from 'styled-components'
import { updateFilters } from 'features/uiSettings/transactionsUiSlice'

// eslint-disable-next-line
import { green } from 'logger'

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

export const ColumnHead = ({ fieldName }) => {
  const dispatch = useDispatch()

  const [_value, _setValue] = useState('')

  // useEffect(() => {
  //   fieldName === tFields.omit.name ? _setValue('No') : _setValue('')
  // }, [fieldName])

  const _valueChanged = (event) => {
    // const name = event.target.name
    const value = event.target.value
    // if (name === tFields.omit.name) {
    // value === 'true' ? _setValue(true) : _setValue(false)
    // } else {
    _setValue(value)
    dispatch(updateFilters({ name: fieldName, value }))
    // }
  }

  // console.group('ColumnHeading')
  // console.groupEnd()

  return (
    <th>
      <div>
        {fieldName === tFields.omit.name ? (
          ''
        ) : (
            // <input
            //   id={fieldName}
            //   type="text"
            //   name={fieldName}
            //   value={_value}
            //   onChange={_valueChanged}
            // />
            <TextInput
              id={fieldName}
              name={fieldName}
              placeholder="filter"
              onChange={_valueChanged}
              type="text"
              value={_value}
            />
          )}
        <div>{fieldName}</div>
        {/* <SortButtons updateSort={_updateSort} fieldName={fieldName} /> */}
      </div>
    </th>
  )
}

