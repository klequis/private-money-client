import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { CheckBox } from 'components/CheckBox'
import { wdCheckboxShowOmitted } from 'appWords'
import { selectCheckboxShowOmittedValue } from 'features/selectors'
import { updateCheckboxShowOmitted } from 'features/txTbl'
import { txFetchStatusSetRefresh } from 'features/tx'

export const ShowOmittedOptions = () => {
  const _dispatch = useDispatch()
  const _checkboxShowOmittedChange = (e) => {
    const { checked } = e.target
    _dispatch(updateCheckboxShowOmitted({ checked }))
    _dispatch(txFetchStatusSetRefresh())
  }
  const _checkboxShowOmitedValue = useSelector(selectCheckboxShowOmittedValue)
  return (
    <CheckBox
      checked={_checkboxShowOmitedValue}
      disabled={false}
      id="chk-omitted"
      labelText="Show omitted"
      name={wdCheckboxShowOmitted}
      onChange={_checkboxShowOmittedChange}
    />
  )
}
