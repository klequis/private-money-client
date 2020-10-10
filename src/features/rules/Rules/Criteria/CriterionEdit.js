// @ts-nocheck
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { criteriaSelectFields, operatorSelectFields } from 'globalConstants'
import Select from 'components/Select'
import TextEdit from 'components/TextEdit'
import CheckBox from 'components/CheckBox'
import { updateRuleEditCriterion } from 'features/rules/rulesSlice'
import * as R from 'ramda'
import styled from 'styled-components'

// eslint-disable-next-line
import { green, redf, purple } from 'logger'

const Row = styled.div`
  display: flex;
  border: 1px solid white;
  background-color: blue;
  @media (min-width: 601px) {
    align-items: center;
  }
  @media (max-width: 600px) {
    flex-direction: column;
    aligh-items: flex-start;
  }
`

const CheckDiv = styled.div`
  padding-right: 5px;
  padding-left: 5px;
  @media (max-width: 600px) {
    align-items: center;
    padding-top: 10px;
    padding-bottom: 5px;
  }
`

const SelectDiv = styled.div`
  flex-basis: 30%;
`

const TextEditDiv = styled.div`
  flex-basis: 65%;
`

// @ts-ignore
const mergeCriterionProp = (newProp, criterion) => {
  return R.mergeRight(criterion, newProp)
}

const CriterionEdit = ({ criterion }) => {
  const [_criterion, _setCriterion] = useState(criterion)
  const { operation, field, value, active } = _criterion
  const dispatch = useDispatch()

  const _handleChange = (event) => {
    const { name, value, checked, type } = event.currentTarget

    const newProp = { [name]: type === 'checkbox' ? checked : value }

    const newCriterion = mergeCriterionProp(newProp, _criterion)
    _setCriterion(newCriterion)
    dispatch(updateRuleEditCriterion(newCriterion))
  }

  const _handleBlur = (event) => {
    const { name, value } = event.currentTarget
    // console.group('_handleBlur')
    // green('_criterion', _criterion)
    // green('name', name)
    // green('value', value)
    // console.groupEnd()
    const newProp = { [name]: value }
    // const newCriterion = R.mergeRight(_criterion, { [name]: value })
    const newCriterion = mergeCriterionProp(newProp, _criterion)
    _setCriterion(newCriterion)
    if (newCriterion.active) {
      dispatch(updateRuleEditCriterion(newCriterion))
    }
  }

  // green('CriterionEdit: active', active)
  return (
    <Row id="CriterionEdit">
      <CheckDiv>
        <CheckBox name="active" checked={active} onChange={_handleChange} />
      </CheckDiv>
      <SelectDiv>
        <Select
          name="field"
          value={field}
          onChange={_handleChange}
          disabled={!active}
          onBlur={_handleBlur}
        >
          {criteriaSelectFields.map((f) => (
            <option key={f.name} value={f.name}>
              {f.description}
            </option>
          ))}
        </Select>
      </SelectDiv>
      <SelectDiv>
        <Select
          name="operation"
          value={operation}
          onChange={_handleChange}
          disabled={!active}
          onBlur={_handleBlur}
        >
          {operatorSelectFields.map((o) => (
            <option key={o.name} value={o.name}>
              {o.description}
            </option>
          ))}
        </Select>
      </SelectDiv>
      <TextEditDiv>
        <TextEdit
          name="value"
          value={value}
          onChange={_handleChange}
          disabled={!active}
          onBlur={_handleBlur}
          minChars={3}
        />
      </TextEditDiv>
    </Row>
  )
  
}

export default CriterionEdit

/*
<Button variant="primary" onClick={_criterionRemove} size="sm">
Remove
</Button>
*/


/*


*/