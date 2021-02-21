import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'
import { Radio } from 'components/Radio'
import {
  selectRadioHasCategoryValue,
  selectRadioHasCategoryDisabled
} from 'features/selectors'
import {
  wdRadioCategorized,
  wdBoth,
  wdNoCategory,
  wdHasCategory
} from 'appWords'
import { updateRadioCategorized } from 'features/transactions'

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
    const { value } = event.target
    _dispatch(updateRadioCategorized({ value })) //TODO: what is the action value that must be passed?
  }

  const _radioCategorizedValue = useSelector(selectRadioHasCategoryValue)
  const _radioCategorizedDisabled = useSelector(selectRadioHasCategoryDisabled)
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
        value={wdHasCategory}
      />
      <Radio
        disabled={_radioCategorizedDisabled}
        currentGroupValue={_radioCategorizedValue}
        id="uncategorizedId"
        labelText="Uncategorized"
        name={wdRadioCategorized}
        onChange={_radioCategorizedChange}
        value={wdNoCategory}
      />
    </RowDiv>
  )
}
