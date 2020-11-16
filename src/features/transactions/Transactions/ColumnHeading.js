// TODO: re-enable sort

import React, { useState } from 'react'
import { transactionFields as tFields } from 'features/transactions'

// eslint-disable-next-line
import { green } from 'logger'

export const ColumnHeading = ({ fieldName, setFilter }) => {
  // const [_state, _setState] = useState({
  //   date: '',
  //   acctId: '',
  //   description: '',
  //   credit: '',
  //   debit: '',
  //   category1: '',
  //   category2: '',
  //   type: '',
  //   omit: false
  // })

  const [_value, _setValue] = useState('')

  // useEffect(() => {
  //   fieldName === tfields.omit.name ? _setValue('No') : _setValue('')
  // }, [fieldName])

  const _valueChanged = (event) => {
    // const name = event.target.name
    const value = event.target.value
    // if (name === tfields.omit.name) {
    // value === 'true' ? _setValue(true) : _setValue(false)
    // } else {
    _setValue(value)
    setFilter(fieldName, value)
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
          <input
            id={fieldName}
            name={fieldName}
            placeholder="filter"
            onChange={_valueChanged}
            size="sm"
            type="text"
            value={_value}
          />
        )}
        <span>{fieldName}</span>
        {/* <SortButtons updateSort={_updateSort} fieldName={fieldName} /> */}
      </div>
    </th>
  )
}
