import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  updateRadioState,
} from 'features/uiSettings/transactionsUiSlice'
import styled from 'styled-components'
import { Radio } from 'components/Radio'
import * as R from 'ramda'
import {
  transactionOptionValues as optionValues,
  transactionOptionNames
} from 'globalConstants'
import {
  selectOptionState
} from 'features/selectors'
import { slicePaths } from 'features/selectors'
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

export const TableNav = () => {

  const dispatch = useDispatch()

  const { ruleRadio, categorizeRadio } = transactionOptionNames
  const _optionState = useSelector(selectOptionState)

  const _radioChange = (event) => {
    const { name, value } = event.target
    dispatch(updateRadioState({ name, value }))
  }

  const ruleGroupValue = R.path(slicePaths.ruleRadioValue, _optionState)
  const categorizeGroupValue = R.path(slicePaths.categorizeRadioValue, _optionState)
  const categorizeDisabled = R.path(slicePaths.categorizeRadioDisabled, _optionState)

  return (
    <Options>
      <Row>
        <RowTitle>Transactions: </RowTitle>
        <Radio
          groupValue={ruleGroupValue}
          id='allId'
          label="All"
          name={ruleRadio}
          onChange={_radioChange}
          width={70}
          value={optionValues.all}
        />
        <Radio
          groupValue={ruleGroupValue}
          id='hasRuleId'
          label="Has rule"
          name={ruleRadio}
          onChange={_radioChange}
          width={120}
          value={optionValues.hasRule}
        />
        <Radio
          groupValue={ruleGroupValue}
          id='doesNotHaveRuleId'
          label="Does not have rule"
          name={ruleRadio}
          onChange={_radioChange}
          value={optionValues.doesNotHaveRule}
        />

      </Row>
      <Row>
        <RowTitle>Category: </RowTitle>
        <Radio
          disabled={categorizeDisabled}
          groupValue={categorizeGroupValue}
          id="bothId"
          label="Both"
          name={categorizeRadio}
          onChange={_radioChange}
          value={optionValues.both}
          width={70}
        />
        <Radio
          disabled={categorizeDisabled}
          groupValue={categorizeGroupValue}
          id="categorizedId"
          label="Categorized"
          name={categorizeRadio}
          onChange={_radioChange}
          width={120}
          value={optionValues.categorized}
        />
        <Radio
          disabled={categorizeDisabled}
          groupValue={categorizeGroupValue}
          id="uncategorizedId"
          label="Uncategorized"
          name={categorizeRadio}
          onChange={_radioChange}
          value={optionValues.uncategorized}
        />
      </Row>
    </Options>
  )
}