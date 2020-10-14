import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import TextEditInput from './TextEditInput'
import * as R from 'ramda'

// eslint-disable-next-line
import { green, redf, yellow } from 'logger'

const Wrapper = styled.div`
  width: 100%;  
`
// const ErrorLabel = styled.label`
//   background-color: green; 
//   width: 100%;
// `

// const _getStyle = (touched, isValid) => {
//   // console.group('**')
//   // green('touched', touched)
//   // green('isValid', isValid)
//   // console.groupEnd()
//   if (touched && !isValid) {
//     return { backgroundColor: '#e74c3c', color: 'white' }
//   }
//   return { backgroundColor: '#fff', color: '#444' }
// }

const TextEdit = React.memo(({
  disabled,
  labelText,
  minChars = 0,
  name,
  placeholder = '',
  initialValue = '',
  onBlur,
}) => {
  // green('TextEdit: initialValue', typeof initialValue)

  // console.group('**')
  // green('_touched', _touched)
  // // const _isValid = !_touched ? true : _value.length < minChars
  // green('_value.length', _value.length)

  // green('_isValid', _isValid)
  // console.groupEnd()

  return (<Wrapper>
    <div className="form-group">
      <label
        className="col-form-label col-form-label-sm"
        htmlFor={`TextEdit-${name}`}>{labelText}
      </label>
      <TextEditInput
        initialValue={initialValue}
        name={name}
        disabled={disabled}
        placeholder={placeholder}
        onBlur={onBlur}
      />
      {/* <ErrorLabel>
          <label
          // style={
          //   _isValid ? { visibility: 'hidden' } : { visibility: 'visible' }
          // }
          >
            {_isValid ? 'valid' : 'not valid'}
          </label>
        </ErrorLabel> */}
    </div>
  </Wrapper>)
})

export default TextEdit

// const isValidInitialValue = value => {
//   green('isValidInitialValue: value', value)
//   green('isValidInitialValue: typeof value', R.type(value))
//   const a = R.type(value) === 'String' || R.type(value) === 'Number' || R.type(value) === 'Undefined'
  
//   green('b', b)
//   // green('a', a)
//   return a
// }

function isValidInitialValue(props, propName, componentName) {
  // yellow('value', value)
  // yellow('type', R.type(value))
  const a = ['String', 'Number', 'Undefined'].includes(R.type(props[propName]))
  // yellow('a', a)
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