import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { TextEditInput } from './TextEditInput'
import * as R from 'ramda'
import { ErrorLabel } from 'components/ErrorLabel'
import { errorLevels } from 'globalConstants'
import { InputLabel } from './InputLabel'

// eslint-disable-next-line
import { green, redf, yellow } from 'logger'
// eslint-disable-next-line
import { RenderCount } from 'components/RenderCount'

let countTotal = 0
let countReturn = 0

const TextEditDiv = styled.div``

// width: 100%;
// max-width: ${props => props.maxWidth === 'none' ? 'none' : props.maxWidth}px

const { errorLevelNone } = errorLevels

/**
 * @param props
 * @param props.disabled
 * @param props.maxWidth
 * @param props.value
 */
export const TextEdit = React.memo(
  ({
    disabled,
    errorLevel = errorLevelNone,
    labelText = '',
    width,
    maxWidth,
    minChars = 0,
    name,
    onBlur,
    onChange,
    placeholder = '',
    value = ''
  }) => {
    countTotal = countTotal + 1

    countReturn = countReturn + 1
    return (
      <>
        <RenderCount
          componentName="TextEdit"
          countTotal={{ actual: countTotal, min: 4, max: 4 }}
          countReturn={{ actual: countReturn, min: 4, max: 4 }}
        />
        <TextEditDiv className="mx-1">
          <InputLabel>{labelText}</InputLabel>
          <TextEditInput
            disabled={disabled}
            errorLevel={errorLevel}
            width={width}
            maxWidth={maxWidth}
            name={name}
            onBlur={onBlur}
            onChange={onChange}
            placeholder={placeholder}
            value={value}
          />
          <ErrorLabel errorLevel={errorLevel} />
        </TextEditDiv>
      </>
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
  value: isValidInitialValue,
  width: PropTypes.number,
  maxWidth: PropTypes.number,
  minChars: PropTypes.number,
  name: PropTypes.string.isRequired,
  onBlur: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string
}
