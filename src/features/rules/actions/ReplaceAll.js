import { Select } from 'components/Select'
import { TextEdit } from 'components/TextEdit'
import { txFields } from 'features/tx'
import { wdFindValue, wdNumAdditionalChars } from 'appWords'

export const ReplaceAll = ({ action, onChange }) => {
  const _handleBlur = () => {}
  return (
    <>
      <Select
        name="field"
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
        placeholder="find value"
        value={action.findValue}
        onBlur={_handleBlur}
      />
      <TextEdit
        name={wdNumAdditionalChars}
        labelText={wdNumAdditionalChars}
        placeholder={wdNumAdditionalChars}
        value={action.numAdditionalChars}
        onChange={onChange}
        onBlur={_handleBlur}
      />
    </>
  )
}
