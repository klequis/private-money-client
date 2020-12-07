import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  updateRadioState,
} from 'features/txTbl'
import styled from 'styled-components'
import { Radio } from 'components/Radio'
import {
  selectRadioHasRuleValue,
  selectRadioCategorizedValue,
  selectRadioCategorizedDisabled
  
} from 'features/selectors'
import {
  wdRadioHasRule,
  wdAll,
  wdHasRule,
  wdDoesNotHaveRule,
  wdRadioCategorized,
  wdCategorized,
  wdUncategorized,
  wdBoth
} from 'appWords'

const allId = 'allId'
const hasRuleId = 'hasRuleId'
const doesNotHaveRuleId = 'doesNotaveRuleId'


// eslint-disable-next-line
import { purple, green } from 'logger'

const Row = styled.div`
  display: flex;
  padding: 0 0 .5em 0;
`

const RowTitle = styled.div`
  width: 100px;
`

const Options = styled.div`
  padding: 5px;
`

export const TxTblNav = () => {

  const dispatch = useDispatch()

  const _radioChange = (event) => {
    const { name, value } = event.target
    dispatch(updateRadioState({ name, value }))
  }

  const radioHasRuleValue = useSelector(selectRadioHasRuleValue)
  // green('radioHasRuleValue', radioHasRuleValue)
  const radioCategorizedValue = useSelector(selectRadioCategorizedValue)
  // green('radioCategorizedValue', radioCategorizedValue)
  const radioCategorizedDisabled = useSelector(selectRadioCategorizedDisabled)
  // green('radioCategorizedDisabled', radioCategorizedDisabled)

  return (
    <Options>
      <Row>
        <RowTitle>Transactions: </RowTitle>
        <Radio
          currentGroupValue={radioHasRuleValue}
          id={allId}
          label="All"
          name={wdRadioHasRule}
          onChange={_radioChange}
          width={70}
          value={wdAll}
        />
        <Radio
          currentGroupValue={radioHasRuleValue}
          id={hasRuleId}
          label="Has rule"
          name={wdRadioHasRule}
          onChange={_radioChange}
          width={120}
          value={wdHasRule}
        />
        <Radio
          currentGroupValue={radioHasRuleValue}
          id={doesNotHaveRuleId}
          label="Does not have rule"
          name={wdRadioHasRule}
          onChange={_radioChange}
          value={wdDoesNotHaveRule}
        />

      </Row>
      <Row>
        <RowTitle>Category: </RowTitle>
        <Radio
          disabled={radioCategorizedDisabled}
          currentGroupValue={radioCategorizedValue}
          id="bothId"
          label="Both"
          name={wdRadioCategorized}
          onChange={_radioChange}
          value={wdBoth}
          width={70}
        />
        <Radio
          disabled={radioCategorizedDisabled}
          currentGroupValue={radioCategorizedValue}
          id="categorizedId"
          label="Categorized"
          name={wdRadioCategorized}
          onChange={_radioChange}
          width={120}
          value={wdCategorized}
        />
        <Radio
          disabled={radioCategorizedDisabled}
          currentGroupValue={radioCategorizedValue}
          id="uncategorizedId"
          label="Uncategorized"
          name={wdRadioCategorized}
          onChange={_radioChange}
          value={wdUncategorized}
        />
      </Row>
    </Options>
  )
}