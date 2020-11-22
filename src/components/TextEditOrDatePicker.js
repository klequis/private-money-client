import React from 'react'
import PropTypes from 'prop-types'
import { TextEdit } from 'components/TextEdit'
import { DatePicker } from 'components/DatePicker'
import {
  transactionFields as tFields,
  transactionFieldNames
} from 'features/transactions'

// eslint-disable-next-line
import { green, redf, purple } from 'logger'
// eslint-disable-next-line
import { RenderCount } from 'components/RenderCount'
import * as R from 'ramda'

let countTotal = 0
let countReturn = 0

export const TextEditOrDatePicker = ({
  disabled = false,
  errorLevel,
  field,
  value,
  maxWidth,
  minChars,
  name,
  onChange,
  onBlur,
  placeholder
}) => {
  countTotal = countTotal + 1

  if (R.type(onChange) !== 'Function') {
    green(`TextEditInput (${name}): onChange`, onChange)
  }

  countReturn = countReturn + 1
  if (field === tFields.date.name) {
    return (
      <DatePicker
        disabled={disabled}
        value={value}
        maxWidth={maxWidth}
        minChars={minChars}
        name={name}
        onChange={onChange}
        onBlur={onBlur}
        errorLevel={errorLevel}
      />
    )
  }
  return (
    <>
      
      <TextEdit
        disabled={disabled}
        errorLevel={errorLevel}
        maxWidth={maxWidth}
        name={name}
        onBlur={onBlur}
        onChange={onChange}
        placeholder={placeholder}
        value={value}
      />
      <RenderCount
        componentName="TextEditOrDatePicker"
        countTotal={{ actual: countTotal, min: 4, max: 4 }}
        countReturn={{ actual: countReturn, min: 4, max: 4 }}
      />
    </>
  )
}

TextEditOrDatePicker.propTypes = {
  disabled: PropTypes.bool,
  errorLevel: PropTypes.shape({
    name: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired
  }),
  field: PropTypes.oneOf(transactionFieldNames),
  value: PropTypes.any,
  maxWidth: PropTypes.number,
  minChars: PropTypes.number,
  name: PropTypes.string.isRequired,
  onBlur: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string
}
