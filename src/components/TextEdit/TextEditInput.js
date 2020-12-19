import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import styled from 'styled-components'
// import { errorLevels } from 'globalConstants'

// eslint-disable-next-line
import { green, redf, purple } from 'logger'
// import * as R from 'ramda'
// eslint-disable-next-line
import { RenderCount } from 'components/RenderCount'

let countTotal = 0
let countReturn = 0

const TextInput = styled.input`
  width: ${(props) => props.width + 'px'};
  max-width: ${(props) =>
    props.maxWidth === 'none' ? 'none' : props.maxWidth + 'px'};
  background-color: ${({ errorLevel }) => errorLevel.color};
`

export const TextEditInput = ({
  disabled,
  errorLevel,
  value,
  width,
  maxWidth = 'none',
  name,
  onBlur,
  onChange,
  placeholder
}) => {
  countTotal = countTotal + 1

  const _handleChange = (event) => {
    onChange(event)
  }

  const _handleBlur = (event) => {
    onBlur(event)
  }

  countReturn = countReturn + 1
  return (
    <div>
      <TextInput
        className={classNames(['form-control', 'form-control-sm'])}
        disabled={disabled}
        errorLevel={errorLevel}
        width={width}
        maxWidth={maxWidth}
        name={name}
        onBlur={_handleBlur}
        onChange={_handleChange}
        placeholder={placeholder}
        type="text"
        value={value}
      />
    </div>
  )
}

TextEditInput.propTypes = {
  disabled: PropTypes.bool.isRequired,
  errorLevel: PropTypes.shape({
    name: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired
  }),
  value: PropTypes.any,
  maxWidth: PropTypes.number,
  minChars: PropTypes.number,
  onBlur: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string
}
