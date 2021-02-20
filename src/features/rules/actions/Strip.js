import { Select } from 'components/Select'
import { TextEdit } from 'components/TextEdit'
import { txFields } from 'features/tx'

// eslint-disable-next-line
import { green, redf, purple } from 'logger'
import { wdField, wdFindValue, wdNumAdditionalChars } from 'appWords'

export const Strip = ({ action, onChange }) => {
  return (
    <>
      <Select
        name={wdField}
        value={action.field}
        onChange={onChange}
        maxWidth={100}
      >
        <option value={txFields.description.name}>Description</option>
        <option value={txFields.type.name}>Type</option>
      </Select>
      <TextEdit
        name={wdFindValue}
        labelText={wdFindValue}
        onChange={onChange}
        placeholder="find value"
        value={action.findValue}
      />
      <TextEdit
        name={wdNumAdditionalChars}
        labelText={wdNumAdditionalChars}
        placeholder={wdNumAdditionalChars}
        value={action.numAdditionalChars}
        onChange={onChange}
      />
    </>
  )
}
