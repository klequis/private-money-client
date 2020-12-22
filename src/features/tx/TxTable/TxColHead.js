import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { txFields } from 'features/tx'
import styled from 'styled-components'
import { updateFilters, updateSort } from 'features/txTbl'
import { useDebouncedCallback } from 'use-debounce'
import { SortAscTriangle } from 'components/SortAscTriangle'
import { SortDescTriangle } from 'components/SortDescTriangle'
import classNames from 'classnames'

// eslint-disable-next-line
import { green, purple, grpStart, grpEnd } from 'logger'

const TextInput = styled.input`
  width: 100%;
  height: 24px;
`

const SortIconDiv = styled.div`
  display: flex;
  flex-direction: column;
`

const ColNameDiv = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`

const FieldNameDiv = styled.div`
 self-align: flex-start;
 margin-right: 15px;
`

const SpacerDiv = styled.div`
  height: 1px;
`
const _activeColor = 'red'
const _inactiveColor = 'gray'

const SortIcons = ({ fieldName, onChange }) => {
  const [_currentOrder, _setCurrentOrder] = useState('none')
  const _dispatch = useDispatch()

  const _click = (fieldName) => {
    green('fieldName', fieldName)
    
    if (_currentOrder === 'none') {
      _setCurrentOrder('asc')
      onChange({ fieldName, sortOrder: 'asc' })
    } else if (_currentOrder === 'asc') {
      _setCurrentOrder('desc')
      onChange({ fieldName, sortOrder: 'desc' })
    } else {
      _setCurrentOrder('none')
      onChange({ fieldName: '', sortOrder: 'none' })
    }
  }
  return (
    <SortIconDiv onClick={() => _click(fieldName)}>
      <SortAscTriangle width={15} fillColor={ _currentOrder === 'asc' ? _activeColor : _inactiveColor } />
      <SpacerDiv></SpacerDiv>
      <SortDescTriangle width={15} fillColor={ _currentOrder === 'desc' ? _activeColor : _inactiveColor } />
    </SortIconDiv>
  )
}

export const TxColHead = ({ fieldName }) => {
  const _dispatch = useDispatch()

  // const [_value, _setValue] = useState('')

  const _debounced = useDebouncedCallback(
    // function
    (value) => {
      // _setValue(value)
      purple('dispatch', value)
      _dispatch(updateFilters({ name: fieldName, value: value }))
    },
    // delay in ms
    1000
  )

  const _onTextInputChange = (e) => {
    const value = e.target.value
    _debounced.callback(value)
  }

  const _onSortIconsChange = (sortObj) => {
    _dispatch(updateSort(sortObj))
  }


  return (
    <th>
      <div>
        <ColNameDiv>
          <FieldNameDiv>{fieldName}</FieldNameDiv>
          <SortIcons 
            fieldName={fieldName}
            onChange={_onSortIconsChange}
          />
        </ColNameDiv>
        {fieldName === txFields.omit.name ? (
          ''
        ) : (
          <>
            <TextInput
              className={classNames(['form-control', 'form-control-sm'])}
              type="text"
              onChange={_onTextInputChange}
            />
          </>
        )}
      </div>
    </th>
  )
}
