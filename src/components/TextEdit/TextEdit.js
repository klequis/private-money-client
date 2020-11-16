import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { TextEditInput } from './TextEditInput'
import * as R from 'ramda'
import { ErrorLabel } from 'components/ErrorLabel'

// eslint-disable-next-line
import { green, redf, yellow } from 'logger'

const TextEditDiv = styled.div``

// width: 100%;
// max-width: ${props => props.maxWidth === 'none' ? 'none' : props.maxWidth}px

export const TextEdit = React.memo(
  ({
    disabled,
    maxWidth,
    minChars = 0,
    name,
    placeholder = '',
    initialValue = '',
    onBlur,
    validation
  }) => {
    return (
      <TextEditDiv>
        <TextEditInput
          initialValue={initialValue}
          maxWidth={maxWidth}
          name={name}
          disabled={disabled}
          placeholder={placeholder}
          onBlur={onBlur}
        />
        <ErrorLabel text={validation} />
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
