import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Radio } from 'components/Radio'
import { wdRadioHasRule, wdAll, wdHasRule, wdDoesNotHaveRule } from 'appWords'
import styled from 'styled-components'
import { selectRadioHasRuleValue } from 'features/selectors'
import { updateRadioHasRule } from 'features/txTbl'

const allId = 'allId'
const hasRuleId = 'hasRuleId'
const doesNotHaveRuleId = 'doesNotHaveRuleId'

const RowDiv = styled.div`
  display: flex;
  padding: 0 0 0.5em 0;
`

const RowTitleDiv = styled.div`
  width: 100px;
`

export const HasRuleOptions = () => {
  const _dispatch = useDispatch()
  const _radioHasRuleValue = useSelector(selectRadioHasRuleValue)

  const _radioHasRuleChange = (event) => {
    const { name, value } = event.target
    _dispatch(updateRadioHasRule(value)) // TODO: what is the actual value to pass
  }

  return (
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
  )
}
