import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { txFields } from 'features/tx'
import styled from 'styled-components'
import { updateFilters, updateSort } from 'features/txTbl'
import { useDebouncedCallback } from 'use-debounce'
import classNames from 'classnames'
import { SortIcons } from './SortIcons'

import { selectTxTblFilterValue } from 'features/selectors'

// eslint-disable-next-line
import { green, purple, grpStart, grpEnd } from 'logger'

const TextInput = styled.input`
  width: 100%;
  height: 24px;
`

const ColNameDiv = styled.div`
  display: flex;
  justify-content: ${(props) =>
    props.align === 'right' ? 'flex-end' : 'flex-start'};
  align-items: center;
`

<<<<<<< add-income-expense-options-issue-25:src/features/txTbl/TxTbl/TxTblColHead.js
const FieldDescriptionDiv = styled.div`
  self-align: flex-start;
  margin-right: 15px;
  font-size: 20px;
=======
const FieldNameDiv = styled.div`
 self-align: flex-start;
 margin-right: 15px;
 font-size: 20px;
>>>>>>> Increase TxTblHead font-size:src/features/tx/TxTable/TxColHead.js
`

export const TxTblColHead = ({ fieldName, align, fieldDescription }) => {
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

  const filterValue = useSelector((state) =>
    selectTxTblFilterValue(fieldName, state)
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
<<<<<<< add-income-expense-options-issue-25:src/features/txTbl/TxTbl/TxTblColHead.js
      {fieldName !== txFields.omit.name ? (
        <div>
          <ColNameDiv align={align}>
            <FieldDescriptionDiv>{fieldDescription}</FieldDescriptionDiv>
            <SortIcons fieldName={fieldName} onChange={_onSortIconsChange} />
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
      )}
=======
      {
        fieldName !== txFields.omit.name ? (
          <div>
            <ColNameDiv>
              <FieldNameDiv>{fieldName}</FieldNameDiv>
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
            <FieldNameDiv>{fieldName}</FieldNameDiv>
          )
      }
>>>>>>> Increase TxTblHead font-size:src/features/tx/TxTable/TxColHead.js
    </th>
  )
}
