import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import Select from 'components/Select'
import TextEdit from 'components/TextEdit'
import CheckBox from 'components/CheckBox'
import { ruleEditCriterionUpdate } from 'features/ruleEdit/ruleEditSlice'
import * as R from 'ramda'
import styled from 'styled-components'
import RenderCount from 'components/RenderCount'

import criteria from 'fields/criteria'
import CriteriaFieldSelect from 'components/CriteriaFieldSelect'
import CriteriaOperatorSelect from 'components/CriteriaOperatorSelect'
import CriterionRow from './CriterionRow'

// eslint-disable-next-line
import { green, redf, purple } from 'logger'

let countTotal = 0
let countReturn = 0

// const CriterionRow = styled.div`
//   display: flex;
//   width: 100%;  
//   background-color: red;
//   border: 1px solid white
  
// `

const CheckDiv = styled.div`
  
  flex-basis: 1%;
  flex-grow: 0;
`
/*
  background-color: green;
  border: 1px solid white;
*/

const SelectDiv = styled.div`
  
  flex-basis: 20%;
  flex-grow: 0;
`
/*
background-color: blue;
  border: 1px solid white;
*/

const TextEditDiv = styled.div`
  
  flex-basis: 79%;
  flex-grow: 1;
`

/*
background-color: orange;
  border: 1px solid white;
  */

const mergeCriterionProp = (newProp, criterion) => {
  return R.mergeRight(criterion, newProp)
}

const CriterionEdit = ({ criterion }) => {
  countTotal = countTotal + 1
  
  const [_criterion, _setCriterion] = useState(criterion)
  const { operation, field, value, active } = _criterion

  const dispatch = useDispatch()

  const _handleChange = (event) => {
    const { name, value, checked, type } = event.currentTarget
    const newProp = { [name]: type === 'checkbox' ? checked : value }
    const newCriterion = mergeCriterionProp(newProp, _criterion)
    _setCriterion(newCriterion)
    dispatch(ruleEditCriterionUpdate(newCriterion))
  }

  const _handleBlur = (event) => {
    const { name, value } = event.target
    const newProp = { [name]: value }
    const newCriterion = mergeCriterionProp(newProp, _criterion)
    _setCriterion(newCriterion)
    if (newCriterion.active) {
      dispatch(ruleEditCriterionUpdate(newCriterion))
    }
  }

  countReturn = countReturn + 1
  return (
      
      <CriterionRow>
        {/* <RenderCount
          componentName="CriterionEdit"
          countTotal={{ actual: countTotal, min: 4, max: 4 }}
          countReturn={{ actual: countReturn, min: 4, max: 4 }}
        /> */}
        <CheckDiv id='CheckDiv'>
          <CheckBox name="active" checked={active} onChange={_handleChange} />
        </CheckDiv>
        <SelectDiv id='SelectDiv-Fields'>
          <CriteriaFieldSelect
            name="field"
            value={field}
            onChange={_handleChange}
            disabled={!active}
            onBlur={_handleBlur}
          />
        </SelectDiv>
        <SelectDiv id='SelectDiv-Operators'>
          <CriteriaOperatorSelect
            disabled={!active}
            onBlur={_handleBlur}
            onChange={_handleChange}
            value={operation}
          />
        </SelectDiv>
        <TextEditDiv>
          <TextEdit
            name="value"
            initialValue={value}
            onChange={_handleChange}
            disabled={!active}
            onBlur={_handleBlur}
            minChars={3}
          />
        </TextEditDiv>
      </CriterionRow>
  )

}

export default CriterionEdit

/*
<Button variant="primary" onClick={_criterionRemove} size="sm">
Remove
</Button>
*/


