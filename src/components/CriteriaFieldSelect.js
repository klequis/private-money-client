import React from 'react'
import Select from './Select'
import { criteriaFieldList } from 'features/rules'
import styled from 'styled-components'

const CriteriaFieldSelectDiv = styled.div``

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
          criteriaFieldList.map(f =>
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
