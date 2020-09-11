import React from 'react'
// import { useSelector, dispatch } from 'react-redux'
import {
  operators,
  transactionFields as fields,
} from 'globalConstants'
// import { mergeRight } from 'ramda'
import Button from 'components/Button'
import Select from 'components/Select'
import TextEdit from 'components/TextEdit'
import CheckBox from 'components/CheckBox'
// ruleSlice
// import { selectRuleEditCriteria } from 'features/rules/rulesSlice'

// eslint-disable-next-line
import { green, redf } from 'logger'

const CriterionEdit = ({ criterion }) => {

  // const criterion = useSelector(selectRuleEditCriteria)
  green('criterion', criterion)
  const { operation, field, value, active } = criterion
  console.group('criterion')
  green('operation', operation)
  green('field', field)
  green('value', value)
  green('active', active)
  console.groupEnd()
  
  // const { _id, field, operation, value, active } = criterion

  // const [_values, _setValues] = useState({
  //   _id,
  //   field: field || fields.description,
  //   operation: operation || operators.beginsWith,
  //   value,
  //   active
  // })


  const _handleChange = (event) => {
    // eslint-disable-next-line
    const { name, value, checked } = event.target



    // 1. merge the changes into the criterion

    // 2. send new criterion to updateRuleEditCriterion


    // const newValues = mergeRight(_values, { [name]: value })

    // _setValues(newValues)


    // TODO: handleDirtyChange(true)
    // TODO: handleCriterionChange(newValues)
  }

  return (
    <div className="d-flex">
      <CheckBox checked={active} onChange={_handleChange} />      
      <Select name="field" value={field} onChange={_handleChange} maxWidth={100} disabled={!active}>
        <option value={fields.description.name}>
          {fields.description.description}
        </option>
        <option value={fields.type.name}>{fields.type.description}</option>
        <option value={fields.credit.name}>{fields.credit.description}</option>
        <option value={fields.debit.name}>{fields.debit.description}</option>
        <option value={fields.acctId.name}>{fields.acctId.description}</option>
        <option value={fields.date.name}>{fields.date.description}</option>
      </Select>

      <Select name="operation" value={operation} onChange={_handleChange} maxWidth={100} disabled={!active}>
        <option value={operators.beginsWith}>Begins with</option>
        <option value={operators.contains}>Contains</option>
        <option value={operators.doesNotContain}>Does not contian</option>
        <option value={operators.equals}>Equals</option>
      </Select>
      <TextEdit name="value" value={value} onChange={_handleChange} minWidth={'20%'} disabled={!active}/>
      <Button variant="primary" /*onClick={_criterionRemove}*/  size="sm">Remove</Button>
    </div>
  )
}

export default CriterionEdit


/*



import React, { useState } from 'react'
import {
  operators,
  transactionFields as fields,
} from 'globalConstants'
import { mergeRight } from 'ramda'
import Button from 'components/Button'
import Select from 'components/Select'
import TextEdit from 'components/TextEdit'
import CheckBox from 'components/CheckBox'

// eslint-disable-next-line
import { green, redf } from 'logger'

const CriterionEdit = ({ criterion }) => {

  const { _id, field, operation, value, active } = criterion

  const [_values, _setValues] = useState({
    _id,
    field: field || fields.description,
    operation: operation || operators.beginsWith,
    value,
    active
  })

  const _handleChange = (event) => {
    const { name, value } = event.target
    const newValues = mergeRight(_values, { [name]: value })

    _setValues(newValues)
    // TODO: handleDirtyChange(true)
    // TODO: handleCriterionChange(newValues)
  }
  return (
    <div className="d-flex">
      <CheckBox checked={_values.active} />      
      <Select name="field" value={_values.field} onChange={_handleChange} maxWidth={100} disabled={!_values.active}>
        <option value={fields.description.name}>
          {fields.description.description}
        </option>
        <option value={fields.type.name}>{fields.type.description}</option>
        <option value={fields.credit.name}>{fields.credit.description}</option>
        <option value={fields.debit.name}>{fields.debit.description}</option>
        <option value={fields.acctId.name}>{fields.acctId.description}</option>
        <option value={fields.date.name}>{fields.date.description}</option>
      </Select>

      <Select name="operation" value={_values.operation} onChange={_handleChange} maxWidth={100} disabled={!_values.active}>
        <option value={operators.beginsWith}>Begins with</option>
        <option value={operators.contains}>Contains</option>
        <option value={operators.doesNotContain}>Does not contian</option>
        <option value={operators.equals}>Equals</option>
      </Select>
      <TextEdit name="value" value={_values.value} onChange={_handleChange} minWidth={'20%'} disabled={!_values.active}/>
      <Button variant="primary" onClick={_criterionRemove}  size="sm">Remove</Button>
    </div>
  )
}

export default CriterionEdit









*/