import React from 'react'
import styled from 'styled-components'
import { ErrorLabel } from './ErrorLabel'
import classNames from 'classnames'
import { errorLevels } from 'globalConstants'

// eslint-disable-next-line
import { green, redf, yellow, purple } from 'logger'

const SelectControl = styled.select`
  width: 100%;
  max-width: ${(props) => props.maxWidth}px;
`

/*
    <ErrorLabel /> is not used but there to preserve spacing when Select
    is used in row with TextEdit which will display error messages.
*/
export const Select = ({
  children,
  disabled,
  margin,
  // marginBottom,
  // marginLeft,
  // marginRight,
  // marginTop,
  name,
  maxWidth,
  // minWidth,
  onChange,
  // paddingBottom,
  // paddingLeft,
  // paddingRight,
  // paddingTop,
  value
}) => {
  const { errorLevelNone } = errorLevels
  return (
    <div>
      <SelectControl
        className={classNames('custom-select', 'custom-select-sm')}
        disabled={disabled}
        margin={margin}
        maxWidth={maxWidth}
        name={name}
        onChange={onChange}
        value={value}
      >
        {children}
      </SelectControl>
      <ErrorLabel errorLevel={errorLevelNone} />
    </div>
  )
}
