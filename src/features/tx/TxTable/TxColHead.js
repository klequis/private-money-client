import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { txFields } from 'features/tx'
import styled from 'styled-components'
import { updateFilters, updateSort } from 'features/txTbl'
import { useDebouncedCallback } from 'use-debounce'
import classNames from 'classnames'
import { SortIcons } from './SortIcons'

import {
  selectTxTblFilterValue
} from 'features/selectors'

// eslint-disable-next-line
import { green, purple, grpStart, grpEnd } from 'logger'

const TextInput = styled.input`
  width: 100%;
  height: 24px;
`



const ColNameDiv = styled.div`
  display: flex;
  justify-content: ${props => props.align === "right" ? "flex-end" : "flex-start"};
  align-items: center;
`

const FieldDescriptionDiv = styled.div`
 self-align: flex-start;
 margin-right: 15px;
 font-size: 20px;
`

export const TxColHead = ({ fieldName, align, fieldDescription }) => {
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

  const filterValue = useSelector(state => selectTxTblFilterValue(fieldName, state))

  const _onTextInputChange = (e) => {
    const value = e.target.value
    _debounced.callback(value)
  }

  const _onSortIconsChange = (sortObj) => {
    _dispatch(updateSort(sortObj))
  }


  return (
    <th>
      {
        fieldName !== txFields.omit.name ? (
          <div>
            <ColNameDiv align={align}>
              <FieldDescriptionDiv>{fieldDescription}</FieldDescriptionDiv>
              <SortIcons
                fieldName={fieldName}
                onChange={_onSortIconsChange}
              />
            </ColNameDiv>
            <TextInput
              className={classNames(['form-control', 'form-control-sm'])}
              type="text"
              value={filterValue}
              onChange={_onTextInputChange}
            />
          </div>
        ) : (
            <ColNameDiv align={align}>
              <FieldDescriptionDiv>{fieldDescription}</FieldDescriptionDiv>
            </ColNameDiv>
          )
      }
    </th>
  )
}
