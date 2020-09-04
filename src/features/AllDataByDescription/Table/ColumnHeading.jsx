import React, { useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form'
import { transactionFields as fields } from 'globalConstants'

// eslint-disable-next-line
import { green } from 'logger'

const ColumnHeading = ({ fieldName, setFilter }) => {
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
  //   fieldName === fields.omit.name ? _setValue('No') : _setValue('')
  // }, [fieldName])

  const _valueChanged = (event) => {
    const name = event.target.name
    const value = event.target.value
    // if (name === fields.omit.name) {
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
        {fieldName === fields.omit.name ? (
          ''
        ) : (
          // <input
          //   id={fieldName}
          //   type="text"
          //   name={fieldName}
          //   value={_value}
          //   onChange={_valueChanged}
          // />
          <Form.Control
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

export default ColumnHeading
