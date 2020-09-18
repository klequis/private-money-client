import React, { useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form'
// import { createUseStyles, useTheme } from 'react-jss'
import styled from 'styled-components'

// eslint-disable-next-line
import { green, redf } from 'logger'
import { props } from 'ramda'

// const useStyles = createUseStyles(theme => ({
//   wrapper: {
//     display: 'flex',
//     flexDirection: 'column'
//   },
//   feedback: {
//     marginLeft: 4,
//     fontSize: '0.8375rem',
//     color: theme.colors.text.danger
//   },
//   controlInvalid: {
//     backgroundColor: theme.colors.background.danger
//   }
// }))

const Wrapper = styled.div`
  display: 'flex';
  flexDirection: 'column';
`;

const FormControl = styled(Form.Control)`
  height: calc(1.5em + 0.35rem + 2px);
  padding-top: 0;
  padding-bottom: 0;
  padding-right: 0;
  font-size: 0.675rem;
  &is-invalid {
    background-color: red;
  }
  
  
`

const makeStyle = (maxWidth, minWidth) => {
  // const textStyle = {
  //   height: 'calc(1.5em + 0.35rem + 2px)',
  //   paddingTop: 0,
  //   paddingBottom: 0,
  //   paddingRight: 0,
  //   fontSize: '0.675rem'
  // }
  const max = maxWidth ? { maxWidth } : {}
  const min = minWidth ? { minWidth } : {}
  return { /*...textStyle,*/ ...max, ...min }
}

const TextEdit = ({
  disabled,
  onBlur,
  maxWidth = null,
  minChars = 0,
  minWidth = null,
  name,
  placeholder = '',
  value = ''
}) => {
  const [_value, _setValue] = useState(value)
  const [_touched, _setTouched] = useState(false)
  const [_isMinLength, _setIsMinLength] = useState(true)
  const [_isValid, _setIsValid] = useState(true)

  const classes = {}
  const style = makeStyle(maxWidth, minWidth)

  const _handleChange = (event) => {
    const { value } = event.target
    _setValue(value)
    _setIsMinLength(value.length >= minChars)
  }

  const _handleBlur = (event) => {
    const { value } = event.target
    _setIsMinLength(value.length >= minChars)
    _setTouched(true)
    onBlur(event)
  }

  // const _isValid = _touched ? _isMinLength : true
  useEffect(() => {
    _setIsValid(_touched ? _isMinLength : true)
  }, [_setIsValid, _touched, _isMinLength])

  return (
    <Wrapper>
      <FormControl
        // style={style}
        // className={_isValid ? '' : classes.controlInvalid }
        type="text"
        name={name}
        value={_value}
        custom
        onChange={_handleChange}
        onBlur={_handleBlur}
        placeholder={placeholder}
        disabled={disabled}
        invalid={true}
        isInvalid={true}
      />
      {
        _isValid ? null : <span className={classes.feedback}>Minimum 3 characters</span>
      }
      
    </Wrapper>
  )
}

export default TextEdit
