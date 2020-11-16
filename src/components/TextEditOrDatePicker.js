import React from 'react'
import PropTypes from 'prop-types'
import { TextEdit } from 'components/TextEdit'
import { DatePicker } from 'components/DatePicker'
import { transactionFields as tFields, transactionFieldNames } from 'features/transactions'

export const TextEditOrDatePicker = ({
  disabled = false,
  field,
  initialValue,
  maxWidth,
  minChars,
  name,
  onChange,
  onBlur,
  validation
}) => {
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
        validation={validation}
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
      validation={validation}
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
  validation: PropTypes.string
}