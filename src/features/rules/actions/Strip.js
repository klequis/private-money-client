import React from 'react'
import { Select } from 'components/Select'
import { TextEdit } from 'components/TextEdit'
import { transactionFields as tFields } from 'features/transactions'

// eslint-disable-next-line
import { green, redf, purple } from 'logger'

export const Strip = ({ action, onChange }) => {
  return (
    <>
      <Select
        name="field"
        value={action.field}
        onChange={onChange}
        maxWidth={100}
      >
        <option value={tFields.description.name}>Description</option>
        <option value={tFields.type.name}>Type</option>
      </Select>
      <TextEdit
        name="findValue"
        label="findValue"
        onChange={onChange}
        placeholder="find value"
        value={action.findValue}
      />
      <TextEdit
        name="numAdditionalChars"
        label="numAdditionalChars"
        placeholder="numAdditionalChars"
        value={action.numAdditionalChars}
        onChange={onChange}
      />
    </>
  )
}
