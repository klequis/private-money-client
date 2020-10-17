// @ts-nocheck
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

// eslint-disable-next-line
import { green, redf, purple } from 'logger'

let countTotal = 0
let countReturn = 0

const Row = styled.div`
  display: flex;
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

const Options = ({ thingsToMap }) => {

  R.map(o =>
    <option key={o.name} value={o.name}>
      {o.description}
    </option>,
    thingsToMap
  )

}

// @ts-ignore
const mergeCriterionProp = (newProp, criterion) => {
  return R.mergeRight(criterion, newProp)
}

const CriterionEdit = ({ criterion }) => {
  countTotal = countTotal + 1
  const { fields: cFields, operators: oFields } = criteria
  const [_criterion, _setCriterion] = useState(criterion)
  const { operation, field, value, active } = _criterion

  green('criteria', criteria)
  green('criteria.operators', criteria.operators)
  const v = R.values(criteria.operators)
  green('v', v)

  // return null

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
  green('criteria', criteria)
  return (
    <div>
      <RenderCount
        componentName="CriterionEdit"
        countTotal={{ actual: countTotal, min: 4, max: 4 }}
        countReturn={{ actual: countReturn, min: 4, max: 4 }}
      />

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

            {
              R.map(f => {
                green('f', typeof f)
                return (<option key={f.name} value={f.name}>
                  {f.description}
                </option>)
              },
                R.values(cFields)
              )
            }
          </Select>
        </SelectDiv>
        <SelectDiv>
          <Select
            name="operation"
            value={operation}
            onChange={_handleChange}
            disabled={!active}
            onBlur={_handleBlur}
          >{
            R.map((
              f => (<option key={f.name} value={f.name}>
                  {f.description}
                </option>)
            ),
              R.values(criteria.operators)
            )
          }
          </Select>
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
      </Row>
    </div>
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