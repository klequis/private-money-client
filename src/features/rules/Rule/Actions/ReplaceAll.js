import React from 'react'
import Select from 'components/Select'
import TextEdit from 'components/TextEdit'
import { transactionFields as fields } from 'globalConstants'

const ReplaceAll = ({ action, onChange }) => {

  const _handleBlur = () => { }
  return (
    <>
      <Select
        name="field"
        value={action.field}
        onChange={onChange}
        maxWidth={100}
      >
        <option value={fields.description.name}>Description</option>
        <option value={fields.type.name}>Type</option>
      </Select>
      <TextEdit
        name="findValue"
        label="findValue"
        placeholder="find value"
        value={action.findValue}
        onBlur={_handleBlur}
      />
      <TextEdit
        name="numAdditionalChars"
        label="numAdditionalChars"
        placeholder="numAdditionalChars"
        value={action.numAdditionalChars}
        onChange={onChange}
        onBlur={_handleBlur}
      />
    </>
  )
}

export default ReplaceAll
