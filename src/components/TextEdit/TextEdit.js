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
    errorLevel = errorLevelNone,
    initialValue = '',
    maxWidth,
    minChars = 0,
    name,
    onBlur,
    onChange,
    placeholder = '',
  }) => {

    // const validation = name === 'date' ? _validateDate : _validateStrings
    if (R.type(onChange) !== 'Function') {
      green(`TextEditInput (${name}): onChange`, onChange)
    }
    

    return (
      <TextEditDiv>
        <TextEditInput
          disabled={disabled}
          errorLevel={errorLevel}
          initialValue={initialValue}
          maxWidth={maxWidth}
          name={name}
          onBlur={onBlur}
          onChange={onChange}
          placeholder={placeholder}
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
  errorLevel: PropTypes.shape({
    name: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired
  }),
  initialValue: isValidInitialValue,
  maxWidth: PropTypes.number,
  minChars: PropTypes.number,
  name: PropTypes.string.isRequired,
  onBlur: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
}
