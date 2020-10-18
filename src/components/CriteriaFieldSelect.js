import React from 'react'
import Select from './Select'
import { fieldList } from 'fields/criteria'
import styled from 'styled-components'

const CriteriaFieldSelectDiv = styled.div`
  
  
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
    <CriteriaFieldSelectDiv>
      <Select
        disabled={disabled}
        name="field"
        onBlur={onBlur}
        onChange={onChange}
        value={value}
      >
        {
          fieldList.map(f =>
            (
              <option key={f.name} value={f.name}>
                {f.description}
              </option>
            )
          )
        }
      </Select>
    </CriteriaFieldSelectDiv>
  )
}

export default CriteriaFieldSelect
