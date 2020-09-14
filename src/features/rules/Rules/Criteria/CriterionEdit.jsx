import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { operators, transactionFields as fields } from 'globalConstants'
import Button from 'components/Button'
import Select from 'components/Select'
import TextEdit from 'components/TextEdit'
import CheckBox from 'components/CheckBox'
// ruleSlice
import { updateRuleEditCriterion } from 'features/rules/rulesSlice'
import * as R from 'ramda'

// eslint-disable-next-line
import { green, redf } from 'logger'

const CriterionEdit = ({ criterion }) => {
  const [_criterion, _setCriterion] = useState(criterion)
  const { operation, field, value, active } = _criterion
  const dispatch = useDispatch()

  const _handleChange = (event) => {
    const { name, value, checked, type } = event.target
    const newCriterion = R.mergeRight(_criterion, {
      [name]: type === 'checkbox' ? checked : value
    })
    _setCriterion(newCriterion)
    dispatch(updateRuleEditCriterion(newCriterion))
  }

  const _handleBlur = (event) => {
    const { name, value } = event.target
    const newCriterion = R.mergeRight(_criterion, { [name]: value })
    _setCriterion(newCriterion)
    if (newCriterion.active) {
      dispatch(updateRuleEditCriterion(newCriterion))
    }
  }

  return (
    <div className="d-flex">
      <CheckBox name="active" checked={active} onChange={_handleChange} />
      <Select
        name="field"
        value={field}
        onChange={_handleChange}
        maxWidth={100}
        disabled={!active}
        onBlur={_handleBlur}
      >
        <option value={fields.description.name}>
          {fields.description.description}
        </option>
        <option value={fields.type.name}>{fields.type.description}</option>
        <option value={fields.credit.name}>{fields.credit.description}</option>
        <option value={fields.debit.name}>{fields.debit.description}</option>
        <option value={fields.acctId.name}>{fields.acctId.description}</option>
        <option value={fields.date.name}>{fields.date.description}</option>
      </Select>

      <Select
        name="operation"
        value={operation}
        onChange={_handleChange}
        maxWidth={100}
        disabled={!active}
        onBlur={_handleBlur}
      >
        <option value={operators.beginsWith.name}>Begins with</option>
        <option value={operators.contains.name}>Contains</option>
        <option value={operators.doesNotContain.name}>Does not contian</option>
        <option value={operators.equals.name}>Equals</option>
      </Select>
      <TextEdit
        name="value"
        value={value}
        onChange={_handleChange}
        minWidth={'20%'}
        disabled={!active}
        onBlur={_handleBlur}
      />
      <Button variant="primary" /*onClick={_criterionRemove}*/ size="sm">
        Remove
      </Button>
    </div>
  )
}

export default CriterionEdit