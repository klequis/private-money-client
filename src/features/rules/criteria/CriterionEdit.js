import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import TextEdit from 'components/TextEdit'
import CheckBox from 'components/CheckBox'
import { ruleEditCriterionUpdate } from 'features/ruleEdit'
import * as R from 'ramda'
import styled from 'styled-components'
// import CriteriaFieldSelect from 'components/CriteriaFieldSelect'
// import CriteriaOperatorSelect from 'components/CriteriaOperatorSelect'
// import { CriterionRow } from './CriterionRow'
import Select from 'components/Select'
import { criteriaFieldList } from 'features/rules'
import { operatorList } from 'features/rules'

// eslint-disable-next-line
import { green, redf, purple } from 'logger'
import RenderCount from 'components/RenderCount'

let countTotal = 0
let countReturn = 0

const Row = styled.div`
  display: flex;
`

const mergeCriterionProp = (newProp, criterion) => {
  return R.mergeRight(criterion, newProp)
}

export const CriterionEdit = ({ criterion }) => {
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

    <Row>
      {/* <RenderCount
          componentName="CriterionEdit"
          countTotal={{ actual: countTotal, min: 4, max: 4 }}
          countReturn={{ actual: countReturn, min: 4, max: 4 }}
        /> */}
      {/* <CheckDiv id='CheckDiv'> */}
      <CheckBox name="active" checked={active} onChange={_handleChange} />
      <Select
        disabled={!active}
        maxWidth={125}
        name="field"
        onBlur={_handleBlur}
        onChange={_handleChange}
        value={field}
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
      <Select
        disabled={!active}
        maxWidth={125}
        name="operation"
        onBlur={_handleBlur}
        onChange={_handleChange}
        value={operation}
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
      <TextEdit
        disabled={!active}
        initialValue={value}
        maxWidth={900}
        minChars={3}
        name="value"
        onChange={_handleChange}
        onBlur={_handleBlur}
      />
    </Row>
  )

}
