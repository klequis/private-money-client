import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { TextEditInput } from './TextEditInput'
import * as R from 'ramda'
import { ErrorLabel } from 'components/ErrorLabel'
import { errorLevels } from 'globalConstants'

// eslint-disable-next-line
import { green, redf, yellow } from 'logger'

const TextEditDiv = styled.div``

// width: 100%;
// max-width: ${props => props.maxWidth === 'none' ? 'none' : props.maxWidth}px

const { errorLevelNone } = errorLevels

/**
 * @param props
 * @param props.disabled
 * @param props.maxWidth
 */
export const TextEdit = React.memo(
  ({
    disabled,
    maxWidth,
    minChars = 0,
    name,
    placeholder = '',
    initialValue = '',
    onBlur,
    errorLevel = errorLevelNone
  }) => {

    // const validation = name === 'date' ? _validateDate : _validateStrings

    green('TextEdit: errorLevel', errorLevel)

    return (
      <TextEditDiv>
        <TextEditInput
          initialValue={initialValue}
          maxWidth={maxWidth}
          name={name}
          disabled={disabled}
          placeholder={placeholder}
          onBlur={onBlur}
          errorLevel={errorLevel}
        />
        <ErrorLabel errorLevel={errorLevel} />
      </TextEditDiv>
    )
  }
)

function isValidInitialValue(props, propName, componentName) {
  const a = ['String', 'Number', 'Undefined'].includes(R.type(props[propName]))
  if (!a) {
    return new Error(
      `The prop '${propName}' in component ${componentName} is marked as requred and must be a number or string.`
    )
  }
}

TextEdit.propTypes = {
  disabled: PropTypes.bool,
  labelText: PropTypes.string,
  minChars: PropTypes.number,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  initialValue: isValidInitialValue,
  onBlur: PropTypes.func.isRequired,
  validation: PropTypes.string
}
