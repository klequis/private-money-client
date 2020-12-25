import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'
import { Radio } from 'components/Radio'
import {
  selectRadioCategorizedValue,
  selectRadioCategorizedDisabled
} from 'features/selectors'
import {
  wdRadioCategorized,
  wdCategorized,
  wdUncategorized,
  wdBoth
} from 'appWords'
import { updateRadioCategorized } from 'features/txTbl'

const RowDiv = styled.div`
  display: flex;
  padding: 0 0 0.5em 0;
`

const RowTitleDiv = styled.div`
  width: 100px;
`

export const IsCategorizedOptions = () => {
  const _dispatch = useDispatch()

  const _radioCategorizedChange = (event) => {
    const { name, value } = event.target
    _dispatch(updateRadioCategorized(value)) //TODO: what is the action value that must be passed?
  }

  const _radioCategorizedValue = useSelector(selectRadioCategorizedValue)
  const _radioCategorizedDisabled = useSelector(selectRadioCategorizedDisabled)
  return (
    <RowDiv>
      <RowTitleDiv>Category: </RowTitleDiv>
      <Radio
        disabled={_radioCategorizedDisabled}
        currentGroupValue={_radioCategorizedValue}
        id="bothId"
        labelText="Both"
        name={wdRadioCategorized}
        onChange={_radioCategorizedChange}
        value={wdBoth}
        width={70}
      />
      <Radio
        disabled={_radioCategorizedDisabled}
        currentGroupValue={_radioCategorizedValue}
        id="categorizedId"
        labelText="Categorized"
        name={wdRadioCategorized}
        onChange={_radioCategorizedChange}
        width={120}
        value={wdCategorized}
      />
      <Radio
        disabled={_radioCategorizedDisabled}
        currentGroupValue={_radioCategorizedValue}
        id="uncategorizedId"
        labelText="Uncategorized"
        name={wdRadioCategorized}
        onChange={_radioCategorizedChange}
        value={wdUncategorized}
      />
    </RowDiv>
  )
}
