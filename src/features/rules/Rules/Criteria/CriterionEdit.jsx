import React, { useState } from 'react'
import {
  operators,
  transactionFields as fields,
} from 'globalConstants'
import { mergeRight } from 'ramda'
import Button from 'components/Button'
import Select from 'components/Select'
import TextEdit from 'components/TextEdit'

// eslint-disable-next-line
import { green, redf } from 'logger'

const CriterionEdit = ({ criterion }) => {

  const { _id, field, operation, value } = criterion

  const [_values, _setValues] = useState({
    _id,
    field: field || fields.description,
    operation: operation || operators.beginsWith,
    value
  })

  const _handleChange = (event) => {
    const { name, value } = event.target
    const newValues = mergeRight(values, { [name]: value })

    setValues(newValues)
    // TODO: handleDirtyChange(true)
    // TODO: handleCriterionChange(newValues)
  }
  return (
    <div className="d-flex">
      <Select name="field" value={_values.field} onChange={_handleChange} maxWidth={100}>
        <option value={fields.description.name}>
          {fields.description.description}
        </option>
        <option value={fields.type.name}>{fields.type.description}</option>
        <option value={fields.credit.name}>{fields.credit.description}</option>
        <option value={fields.debit.name}>{fields.debit.description}</option>
        <option value={fields.acctId.name}>{fields.acctId.description}</option>
        <option value={fields.date.name}>{fields.date.description}</option>
      </Select>

      <Select name="operation" value={_values.operation} onChange={_handleChange} maxWidth={100}>
        <option value={operators.beginsWith}>Begins with</option>
        <option value={operators.contains}>Contains</option>
        <option value={operators.doesNotContain}>Does not contian</option>
        <option value={operators.equals}>Equals</option>
      </Select>
      {/* <Form.Control type="text" name="value" value={_values.value} size="sm" custom/> */}
      <TextEdit name="value" value={_values.value} onChange={_handleChange} minWidth={'20%'}/>
      <Button variant="primary" /*onClick={_criterionRemove}*/  size="sm">Remove</Button>
    </div>
  )
}

export default CriterionEdit
