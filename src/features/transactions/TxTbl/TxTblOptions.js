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
  selectRadioShowIncomeExpenseValue
} from 'features/selectors'

import {
  updateRadioHasRule,
  updateRadioHasCategory,
  updateRadioShowIncomeOrExpense
} from 'features/transactions'

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
      </OptionsDiv>
    </>
  )
}
