import React, { useState } from 'react'
// import { useSelector } from 'react-redux'
// import {
//   selectIsUncategorizedChecked,
//   selectHasRulesChecked,
//   hasRulesToggle,
//   isUncategorizedToggle
// } from 'features/uiSettings/transactionsUi'
import styled from 'styled-components'
import { Radio } from 'components/Radio'
import * as R from 'ramda'
import { optionValues } from './constants'

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

const ruleRadio = 'ruleRadio'
const categorizeRadio = 'categorizeRadio'

export const TableNav = () => {

  const [_optionState, _setOptionState] = useState({
    [ruleRadio]: {
      value: optionValues.all,
    },
    [categorizeRadio]: {
      value: optionValues.both,
      disabled: false
    }
  })

  // const [_hasRules, _setHasRules] = useState(useSelector(selectHasRulesChecked))
  const _makeOptionStateUpdate = (name, value) => {
    return {
      [ruleRadio]: {
        value: name === ruleRadio ? value : _optionState.ruleRadio.value
      },
      [categorizeRadio]: {
        value: name === categorizeRadio ? value : _optionState.categorizeRadio.value,
        disabled: value === optionValues.doesNotHaveRule ? true : false
      }
    }
  }  

  const _radioChange = (event) => {
    const { name, checked, value } = event.target
    _setOptionState(
      R.mergeDeepRight(
        _optionState,
        _makeOptionStateUpdate(name, value)
      )
    )
  }

  return (
    <Options>
      <Row>
        <RowTitle>Transactions: </RowTitle>
        <Radio
          groupValue={_optionState.ruleRadio.value}
          id='allId'
          labelText="All"
          name={ruleRadio}
          onChange={_radioChange}
          width={70}
          value={optionValues.all}
        />
        <Radio
          groupValue={_optionState.ruleRadio.value}
          id='hasRuleId'
          labelText="Has rule"
          name={ruleRadio}
          onChange={_radioChange}
          width={120}
          value={optionValues.hasRule}
        />
        <Radio
          groupValue={_optionState.ruleRadio.value}
          id='doesNotHaveRuleId'
          labelText="Does not have rule"
          name={ruleRadio}
          onChange={_radioChange}
          value={optionValues.doesNotHaveRule}
        />

      </Row>
      <Row>
        <RowTitle>Category: </RowTitle>
        <Radio
          disabled={_optionState.categorizeRadio.disabled}
          groupValue={_optionState.categorizeRadio.value}
          id="bothId"
          labelText="Both"
          name={categorizeRadio}
          onChange={_radioChange}
          value={optionValues.both}
          width={70}
        />
        <Radio
          disabled={_optionState.categorizeRadio.disabled}
          groupValue={_optionState.categorizeRadio.value}
          id="categorizedId"
          labelText="Categorized"
          name={categorizeRadio}
          onChange={_radioChange}
          width={120}
          value={optionValues.categorized}
        />
        <Radio
          disabled={_optionState.categorizeRadio.disabled}
          groupValue={_optionState.categorizeRadio.value}
          id="uncategorizedId"
          labelText="Uncategorized"
          name={categorizeRadio}
          onChange={_radioChange}
          value={optionValues.uncategorized}
        />
      </Row>
    </Options>
  )
}