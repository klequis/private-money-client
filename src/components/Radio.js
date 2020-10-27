import React, { useState } from 'react'
import { isNilOrEmpty } from 'lib/isNilOrEmpty'
import styled from 'styled-components'

// eslint-disable-next-line
import { green } from 'logger'

const makeMargin = (passedMargin) => {
  green('passed margin', passedMargin)
  switch (passedMargin.length) {
    case 1:
      return { margin: passedMargin[0] }
    case 2:
      return {
        marginTop: passedMargin[0],
        marginBottom: passedMargin[0],
        marginRight: passedMargin[1],
        marginLeft: passedMargin[1]
      }
    case 3:
      return null
    case 4:
      return {
        marginTop: passedMargin[0],
        marginRight: passedMargin[1],
        marginBottom: passedMargin[2],
        marginLeft: passedMargin[3],
        border: '1px solid white'
      }
  }
}

const RadioWrapper = styled.div`
  width: ${({ width }) => isNilOrEmpty(width) ? 'auto' : `${width}px`};
  
  
`
// margin: 15px 0 15px 15px; 
// border: 1px solid white;


export const Radio = ({
  id,
  label,
  name,
  value,
  onChange,
  groupValue,
  margin: passedMargin = [],
  width = null
}) => {

  const marginStyle = makeMargin(passedMargin)

  return (
    <RadioWrapper className="form-check" width={width}>
      <input
        className="form-check-input"
        type="radio"
        name={name}
        id={id}
        value={value}
        checked={value === groupValue}
        onChange={onChange}
      />
      <label
        className="form-check-label"
        htmlFor={id}
      >
        {label}
      </label>
    </RadioWrapper>
  )

}

/*
<div
      className="form-check"
      style={isNilOrEmpty(marginStyle) ? {} : marginStyle}

    >

*/