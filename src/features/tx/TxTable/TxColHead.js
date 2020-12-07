import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { txFields } from 'features/tx'
import styled from 'styled-components'
import { updateFilters } from 'features/txTbl'
import { useDebouncedCallback } from 'use-debounce'

// eslint-disable-next-line
import { green, purple, grpStart, grpEnd } from 'logger'

// const TH = styled.th`
//   width: 100%;
// `

const TextInput = styled.input``
/*
  width: 90%;
  display: flex;
  flex-flow: column now;
*/

let renderCount = 0

export const TxColHead = ({ fieldName }) => {
  const dispatch = useDispatch()

  const [_value, _setValue] = useState('')

  const debounced = useDebouncedCallback(
    // function
    (value) => {
      _setValue(value)
      purple('dispatch', value)
      dispatch(updateFilters({ name: fieldName, value: value }))
    },
    // delay in ms
    1000
  )

  const _onChange = (e) => {
    const value = e.target.value
    debounced.callback(value)
  }

  renderCount = renderCount + 1

  return (
    <th>
      <div>
        {fieldName === txFields.omit.name ? (
          ''
        ) : (
          <>
            count: {renderCount}
            <TextInput
              type="text"
              onChange={_onChange}
            />
          </>
        )}
        <div>{fieldName}</div>
        {/* <SortButtons updateSort={_updateSort} fieldName={fieldName} /> */}
      </div>
    </th>
  )
}
