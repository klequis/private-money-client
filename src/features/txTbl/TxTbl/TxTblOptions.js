import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { Radio } from 'components/Radio'
import {
  wdNoCategory,
  wdRadioHasRule,
  wdBoth,
  wdHasRule,
  wdNoRule,
  wdRadioHasCategory,
  wdHasCategory,
  wdRadioShowIncomeExpense,
  wdShowExpenseOnly,
  wdShowIncomeOnly
} from 'appWords'

import {
  selectRadioHasRuleValue,
  selectRadioHasCategoryValue,
  selectRadioHasCategoryDisabled,
  selectRadioShowIncomeExpenseValue,
  selectSelectMonthValue,
  selectSelectYearValue
} from 'features/selectors'

import {
  updateRadioHasRule,
  updateRadioHasCategory,
  updateRadioShowIncomeOrExpense,
  updateSelectYear,
  updateSelectMonth
} from 'features/txTbl'

import { Select } from 'components/Select'

// eslint-disable-next-line
import { purple, green } from 'logger'

const OptionsDiv = styled.div`
  display: flex;
  padding: 5px;
`

const ColumnDiv = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
`

export const TxTblOptions = () => {
  const _dispatch = useDispatch()
  const _radioHasRuleValue = useSelector(selectRadioHasRuleValue)
  const _radioHasCategoryValue = useSelector(selectRadioHasCategoryValue)
  const _radioHasCategoryDisabled = useSelector(selectRadioHasCategoryDisabled)
  const _radioShowIncomeOrExpenseValue = useSelector(
    selectRadioShowIncomeExpenseValue
  )
  const _selectMonthValue = useSelector(selectSelectMonthValue)
  const _selectYearValue = useSelector(selectSelectYearValue)

  const _radioChange = (event) => {
    const { name, value } = event.target
    if (name === wdRadioHasRule) {
      _dispatch(updateRadioHasRule({ value }))
    } else if (name === wdRadioHasCategory) {
      _dispatch(updateRadioHasCategory({ value }))
    } else {
      _dispatch(updateRadioShowIncomeOrExpense({ value }))
    }
  }

  const _selectYearChange = (event) => {
    const { value } = event.target
    green('_selectYearChange: value', value)
    _dispatch(updateSelectYear({ value }))
  }

  const _selectMonthChange = (event) => {
    const { value } = event.target
    green('_selectMonthChange: value', value)
    _dispatch(updateSelectMonth({ value }))
  }

  return (
    <>
      <OptionsDiv>
        <ColumnDiv>
          <Radio
            groupValue={_radioHasRuleValue}
            id="hasRuleBoth"
            labelText="Both"
            name={wdRadioHasRule}
            onChange={_radioChange}
            value={wdBoth}
          />
          <Radio
            groupValue={_radioHasRuleValue}
            id="hasRule"
            labelText="Has rule"
            name={wdRadioHasRule}
            onChange={_radioChange}
            value={wdHasRule}
          />
          <Radio
            groupValue={_radioHasRuleValue}
            id="noRule"
            labelText="No rule"
            name={wdRadioHasRule}
            onChange={_radioChange}
            value={wdNoRule}
          />
        </ColumnDiv>
        <ColumnDiv>
          <Radio
            groupValue={_radioHasCategoryValue}
            disabled={_radioHasCategoryDisabled}
            id="hasCategoryBoth"
            labelText="Both"
            name={wdRadioHasCategory}
            onChange={_radioChange}
            value={wdBoth}
          />
          <Radio
            groupValue={_radioHasCategoryValue}
            disabled={_radioHasCategoryDisabled}
            id="hasCategory"
            labelText="Has category"
            name={wdRadioHasCategory}
            onChange={_radioChange}
            value={wdHasCategory}
          />
          <Radio
            groupValue={_radioHasCategoryValue}
            disabled={_radioHasCategoryDisabled}
            id="noCategory"
            labelText="No category"
            name={wdRadioHasCategory}
            onChange={_radioChange}
            value={wdNoCategory}
          />
        </ColumnDiv>
        <ColumnDiv>
          <Radio
            groupValue={_radioShowIncomeOrExpenseValue}
            id="incomeExpenseBoth"
            labelText="Both"
            name={wdRadioShowIncomeExpense}
            onChange={_radioChange}
            value={wdBoth}
          />
          <Radio
            groupValue={_radioShowIncomeOrExpenseValue}
            id="income"
            labelText="Income"
            name={wdRadioShowIncomeExpense}
            onChange={_radioChange}
            value={wdShowIncomeOnly}
          />
          <Radio
            groupValue={_radioShowIncomeOrExpenseValue}
            id="expense"
            labelText="Expense"
            name={wdRadioShowIncomeExpense}
            onChange={_radioChange}
            value={wdShowExpenseOnly}
          />
        </ColumnDiv>
        <ColumnDiv>
          <Select
            name="year"
            value={_selectYearValue}
            onChange={_selectYearChange}
            maxWidth={100}
          >
            <option value="2019">2019</option>
            <option value="2020">2020</option>
            <option value="2021">2021</option>
          </Select>
          <Select
            name="month"
            value={_selectMonthValue}
            onChange={_selectMonthChange}
            maxWidth={100}
          >
            <option value="jan">Jan</option>
            <option value="feb">Feb</option>
            <option value="mar">Mar</option>
            <option value="apr">Apr</option>
            <option value="may">May</option>
            <option value="jun">Jun</option>
            <option value="jul">Jul</option>
            <option value="aug">Aug</option>
            <option value="sep">Sep</option>
            <option value="oct">Oct</option>
            <option value="nov">Nov</option>
            <option value="dec">Dec</option>
          </Select>
        </ColumnDiv>
      </OptionsDiv>
    </>
  )
}
