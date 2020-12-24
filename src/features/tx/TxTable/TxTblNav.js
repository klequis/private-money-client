import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  updateRadioState,
  updateCheckboxShowOmitted
} from 'features/txTbl'
import styled from 'styled-components'
import { Radio } from 'components/Radio'
import { CheckBox } from 'components/CheckBox'
import {
  selectCheckboxShowOmittedValue,
  selectRadioHasRuleValue,
  selectRadioCategorizedValue,
  selectRadioCategorizedDisabled,
  selectRadioShowIncomeExpenseValue
} from 'features/selectors'
import {
  wdRadioHasRule,
  wdAll,
  wdHasRule,
  wdDoesNotHaveRule,
  wdRadioCategorized,
  wdCategorized,
  wdUncategorized,
  wdBoth,
  wdCheckboxShowOmitted,
  wdRadioShowIncomeExpense,
  wdShowExpenseOnly,
  wdShowIncomeOnly
} from 'appWords'
import {
  txFetchStatusSetRefresh
} from 'features/tx'

const allId = 'allId'
const hasRuleId = 'hasRuleId'
const doesNotHaveRuleId = 'doesNotHaveRuleId'


// eslint-disable-next-line
import { purple, green } from 'logger'

const RowDiv = styled.div`
  display: flex;
  padding: 0 0 .5em 0;
`

const RowTitleDiv = styled.div`
  width: 100px;
`

const OptionsDiv = styled.div`
  display: flex;
  padding: 5px;
`

const ColumnDiv = styled.div`
  display: flex;
  flex-direction: column
`

export const TxTblNav = () => {

  const _dispatch = useDispatch()

  const _radioChange = (event) => {
    const { name, value } = event.target
    _dispatch(updateRadioState({ name, value }))
  }

  const _radioHasRuleChange = (event) => {

  }

  const _radioCategorizedChange = (event) => {
    
  }

  const _radioShowIncomeExpenseChange = (event) => {
    
  }

  const _checkboxChange = (event) => {
    const { checked } = event.target
    _dispatch(updateCheckboxShowOmitted({ checked }))
    _dispatch(txFetchStatusSetRefresh())
  }

  const _radioHasRuleValue = useSelector(selectRadioHasRuleValue)
  const _radioCategorizedValue = useSelector(selectRadioCategorizedValue)
  const _radioCategorizedDisabled = useSelector(selectRadioCategorizedDisabled)
  const _checkboxShowOmitedValue = useSelector(selectCheckboxShowOmittedValue)
  const _radioShowIncomeExpenseValue = useSelector(selectRadioShowIncomeExpenseValue)

  return (
    <OptionsDiv>
      <ColumnDiv style={{ backgroundColor: 'red' }}>
        <RowDiv>
          <RowTitleDiv>Transactions: </RowTitleDiv>
          <Radio
            currentGroupValue={_radioHasRuleValue}
            id={allId}
            labelText="All"
            name={wdRadioHasRule}
            onChange={_radioHasRuleChange}
            width={70}
            value={wdAll}
          />
          <Radio
            currentGroupValue={_radioHasRuleValue}
            id={hasRuleId}
            labelText="Has rule"
            name={wdRadioHasRule}
            onChange={_radioHasRuleChange}
            width={120}
            value={wdHasRule}
          />
          <Radio
            currentGroupValue={_radioHasRuleValue}
            id={doesNotHaveRuleId}
            labelText="Does not have rule"
            name={wdRadioHasRule}
            onChange={_radioHasRuleChange}
            value={wdDoesNotHaveRule}
          />

        </RowDiv>
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
      </ColumnDiv>
      <ColumnDiv  style={{ backgroundColor: 'green' }}>
        <CheckBox
          checked={_checkboxShowOmitedValue}
          disabled={false}
          id="chk-omitted" 
          labelText="Show omitted" 
          name={wdCheckboxShowOmitted}
          onChange={_checkboxChange}
        />
      </ColumnDiv>
      <ColumnDiv>
        <RowDiv>
          <Radio
            // disabled={_radioCategorizedDisabled}
            currentGroupValue={_radioShowIncomeExpenseValue}
            id="showIncomeExpenseId"
            labelText="Show expenses only"
            // name={wdRadioCategorized}
            name={wdRadioShowIncomeExpense}
            onChange={_radioShowIncomeExpenseChange}
            width={120}
            value={wdShowExpenseOnly}
          />         
        </RowDiv>
        <RowDiv>
          <Radio
            // disabled={_radioCategorizedDisabled}
            currentGroupValue={_radioShowIncomeExpenseValue}
            id="showIncomeExpenseId"
            labelText="Show income only"
            name={wdRadioShowIncomeExpense}
            onChange={_radioShowIncomeExpenseChange}
            width={120}
            value={wdShowIncomeOnly}
          />
        </RowDiv>
      </ColumnDiv>
    </OptionsDiv>
  )
}