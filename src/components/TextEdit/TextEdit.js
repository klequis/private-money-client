import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import TextEditInput from './TextEditInput'
import * as R from 'ramda'
import ErrorLabel from 'components/ErrorLabel'

// eslint-disable-next-line
import { green, redf, yellow } from 'logger'

const TextEditDiv = styled.div`
  width: 100%;
  
`

/*
background-color: purple;
*/

const TextEdit = React.memo(({
  disabled,
  minChars = 0,
  name,
  placeholder = '',
  initialValue = '',
  onBlur,
}) => {

  return (
    <TextEditDiv>
        <TextEditInput
          initialValue={initialValue}
          name={name}
          disabled={disabled}
          placeholder={placeholder}
          onBlur={onBlur}
        />
        <ErrorLabel text='TextEdit' />
    </TextEditDiv>)
})

export default TextEdit


function isValidInitialValue(props, propName, componentName) {
  const a = ['String', 'Number', 'Undefined'].includes(R.type(props[propName]))
  if (!a) {
    return new Error(`The prop '${propName}' in component ${componentName} is marked as requred and must be a number or string.`)
  }

}

TextEdit.propTypes = {
  disabled: PropTypes.bool,
  labelText: PropTypes.string,
  minChars: PropTypes.number,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  initialValue: isValidInitialValue,
  onBlur: PropTypes.func.isRequired
}