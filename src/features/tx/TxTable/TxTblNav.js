import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  updateRadioState,
} from 'features/txTbl'
import styled from 'styled-components'
import { Radio } from 'components/Radio'
import {
  selectRuleRadioValue,
  selectCategorizeRadioValue,
  selectCategorizeRadioDisabled
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

  const ruleGroupValue = useSelector(selectRuleRadioValue)
  const categorizeGroupValue = useSelector(selectCategorizeRadioValue)
  const categorizeDisabled = useSelector(selectCategorizeRadioDisabled)

  return (
    <Options>
      <Row>
        <RowTitle>Transactions: </RowTitle>
        <Radio
          groupValue={ruleGroupValue}
          id={allId}
          label="All"
          name={wdRadioHasRule}
          onChange={_radioChange}
          width={70}
          value={wdAll}
        />
        <Radio
          groupValue={ruleGroupValue}
          id={hasRuleId}
          label="Has rule"
          name={wdRadioHasRule}
          onChange={_radioChange}
          width={120}
          value={wdHasRule}
        />
        <Radio
          groupValue={ruleGroupValue}
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
          disabled={categorizeDisabled}
          groupValue={categorizeGroupValue}
          id="bothId"
          label="Both"
          name={wdRadioCategorized}
          onChange={_radioChange}
          value={wdBoth}
          width={70}
        />
        <Radio
          disabled={categorizeDisabled}
          groupValue={categorizeGroupValue}
          id="categorizedId"
          label="Categorized"
          name={wdRadioCategorized}
          onChange={_radioChange}
          width={120}
          value={wdCategorized}
        />
        <Radio
          disabled={categorizeDisabled}
          groupValue={categorizeGroupValue}
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