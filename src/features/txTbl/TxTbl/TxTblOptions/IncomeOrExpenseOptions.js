import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Radio } from 'components/Radio'
import styled from 'styled-components'
import {
  wdRadioShowIncomeExpense,
  wdShowExpenseOnly,
  wdShowIncomeOnly
} from 'appWords'
import { selectRadioShowIncomeExpenseValue } from 'features/selectors'
import { updateRadioShowIncomeExpense } from 'features/txTbl'

const RowDiv = styled.div`
  display: flex;
  padding: 0 0 0.5em 0;
`

export const IncomeOrExpenseOptions = () => {
  const _dispatch = useDispatch()
  const _radioShowIncomeExpenseValue = useSelector(
    selectRadioShowIncomeExpenseValue
  )

  const _radioShowIncomeExpenseChange = (event) => {
    const { name, value } = event.target
    _dispatch(updateRadioShowIncomeExpense(/* TODO: */))
  }

  return (
    <>
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
    </>
  )
}
