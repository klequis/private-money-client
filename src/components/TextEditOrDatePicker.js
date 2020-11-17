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

export const TextEditOrDatePicker = ({
  disabled = false,
  field,
  initialValue,
  maxWidth,
  minChars,
  name,
  onChange,
  onBlur,
  errorLevel
}) => {

  // green('TextEditOrDatePicker: validation', errorLevel)

  if (field === tFields.date.name) {
    
    return (
      <DatePicker
        disabled={disabled}
        initialValue={initialValue}
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
    <TextEdit
      disabled={disabled}
      initialValue={initialValue}
      maxWidth={maxWidth}
      minChars={minChars}
      name={name}
      onChange={onChange}
      onBlur={onBlur}
      errorLevel={errorLevel}
    />
  )
}

TextEditOrDatePicker.propTypes = {
  disabled: PropTypes.bool,
  field: PropTypes.oneOf(transactionFieldNames),
  initialValue: PropTypes.any,
  maxWidth: PropTypes.number,
  minChars: PropTypes.number,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  errorLevel: PropTypes.shape({
    errorLevel: PropTypes.object.isRequired,
    errorMessage: PropTypes.string.isRequired
  })
}
