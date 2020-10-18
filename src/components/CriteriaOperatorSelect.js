import React from 'react'
import Select from './Select'
import { operatorList } from 'fields/criteria'
import styled from 'styled-components'

const Wrapper = styled.div`
  
  

`
/*
background-color: blue !important;
*/
/*
  margin-botton: 100px !important;
  padding-botton: 100px !important;
*/

const CriteriaFieldSelect = ({
  disabled,
  onBlur,
  onChange,
  value,
}) => {

  return (
    <Wrapper>
    <Select
      disabled={disabled}
      name="field"
      onBlur={onBlur}
      onChange={onChange}
      value={value}
    >
      {
        operatorList.map(f =>
          (
            <option key={f.name} value={f.name}>
              {f.description}
            </option>
          )
        )
      }
    </Select>
    </Wrapper>
  )
}

export default CriteriaFieldSelect
