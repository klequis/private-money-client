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

const Row = styled.div`
  display: flex;
  padding: 0 0 .5em 0;
`

const radioMargin = [0, 30, 0, 0]

const ruleRadio = 'ruleRadio'
const categorizeRadio = 'categorizeRadio'

export const TableNav = () => {
  // const [_hasRules, _setHasRules] = useState(useSelector(selectHasRulesChecked))
  const [_value, _setValue] = useState({
    [ruleRadio]: 'all',
    [categorizeRadio]: 'both'
  })

  const _radioChange = (event) => {
    const { name, checked, value } = event.target
    // _setValue(R.mergeRight(_value, {}))
    console.group('Radio._onChange')
    console.log('name', name)
    console.log('checked', checked)
    console.log('value', value)
    console.groupEnd()
    _setValue(R.mergeRight(_value, { [name]: value }))
  }
  
  return (
    <div>
      <Row>
        <Radio
          groupValue={_value.ruleRadio}
          id='allId'
          label="All"
          margin={radioMargin}
          name={ruleRadio}
          onChange={_radioChange}
          width={65}
          value='all'
        />
        <Radio
          groupValue={_value.ruleRadio}
          id='hasRuleId'
          label="Has rule"
          margin={radioMargin}
          name={ruleRadio}
          onChange={_radioChange}
          width={65}
          value='hasRule'
        />
        <Radio
          groupValue={_value.ruleRadio}
          id='doesNotHaveRuleId'
          label="Does not have rule"
          margin={radioMargin}
          name={ruleRadio}
          onChange={_radioChange}
          value='doesNotHaveRule'
        />

      </Row>
      <Row>
      <Radio
          groupValue={_value.categorizeRadio}
          id="bothId"
          label="Both"
          margin={radioMargin}
          name={categorizeRadio}
          onChange={_radioChange}
          value="both"
          width={65}
        />
        <Radio
          groupValue={_value.categorizeRadio}
          id="categorizedId"
          label="Categorized"
          margin={radioMargin}
          name={categorizeRadio}
          onChange={_radioChange}
          value="categorized"
        />
        <Radio
          groupValue={_value.categorizeRadio}
          id="uncategorizedId"
          label="Uncategorized"
          margin={radioMargin}
          name={categorizeRadio}
          onChange={_radioChange}
          value="uncategorized"
        />
      </Row>
    </div>
  )
}