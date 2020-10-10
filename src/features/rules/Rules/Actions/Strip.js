import React from 'react'
import Select from 'components/Select'
import TextEdit from 'components/TextEdit'
import { transactionFields as fields } from 'globalConstants'
// eslint-disable-next-line
import { green, redf, purple } from 'logger'

const Strip = ({ action, handleChange }) => {
  return (
    <>
      <Select name="field" value={action.field} onChange={handleChange} maxWidth={100}>
        <option value={fields.description.name}>Description</option>
        <option value={fields.type.name}>Type</option>
      </Select>
      <TextEdit name="findValue" label="findValue" onChange={handleChange} placeholder="find value" value={action.findValue} />
      <TextEdit
        name="numAdditionalChars"
        label="numAdditionalChars"
        placeholder="numAdditionalChars"
        value={action.numAdditionalChars}
        onChange={handleChange}
      />
    </>
  )
}

export default Strip
