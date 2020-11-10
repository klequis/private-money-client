import React from 'react'
import Select from './Select'
import { operatorList } from 'features/rules'
import styled from 'styled-components'

const Wrapper = styled.div``

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
        
        name="operation"
        onBlur={onBlur}
        onChange={onChange}
        padding
        paddingBottom
        paddingLeft
        paddingRight
        paddingTop
        value={value}
      >
        {
          operatorList.map(o =>
            (
              <option key={o.name} value={o.name}>
                {o.description}
              </option>
            )
          )
        }
      </Select>
    </Wrapper>
  )
}

export default CriteriaFieldSelect
