import React from 'react'
import styled from 'styled-components'
import TextEditInput from './TextEditInput'

// eslint-disable-next-line
import { green, redf } from 'logger'

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
  handleBlur,
  labelText,
  minChars = 0,
  name,
  placeholder = '',
  value = ''
}) => {


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
        value={value}
        name={name}
        disabled={disabled}
        placeholder={placeholder}
        handleBlur={handleBlur}
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
