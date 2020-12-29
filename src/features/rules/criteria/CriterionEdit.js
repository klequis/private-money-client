import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { ruleEditCriterionUpdate } from 'features/rules'
import * as R from 'ramda'
import styled from 'styled-components'
import { Select } from 'components/Select'
import { criteriaFieldList } from 'features/rules'
import { operatorList } from 'features/rules'
import { isStringDate } from 'lib/dataTypes'
import { TextEditOrDatePicker } from 'components/TextEditOrDatePicker'
import { errorLevels } from 'globalConstants'
import {
  wdActive,
  wdBeginsWith,
  wdContains,
  wdDate,
  wdEquals,
  wdField,
  wdOperator,
  wdValue
} from 'appWords'

/* eslint-disable */
import { yellow, green, redf, purple, grpStart, grpEnd } from 'logger'
import { RenderCount } from 'components/RenderCount'
/* eslint-enable */

let countTotal = 0
let countReturn = 0

const { errorLevelNone, errorLevelError } = errorLevels

const RowDiv = styled.div`
  display: flex;
  align-items: center;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
`

/**
 *
 * @param {object} newProp the new prop to be merged into criterion
 * @param {object} criterion the criterion to be updated
 * @returns {object} updated criterion object
 */
const _mergeCriterionProp = (newProp, criterion) => {
  return R.mergeRight(criterion, newProp)
}

/**
 *
 * @param {string} value any string
 * @returns {object} error message
 */
const _validateString = (value) => {
  if (value === '' || value.length < 3) {
    const error = errorLevelError
    error.message = '3 or more characters required'
    return error
  }
  return errorLevelNone
}

/**
 *
 * @param {string} dateString a date as a string
 * @returns {object} error message
 */
const _validateDate = (dateString) => {
  if (!isStringDate(dateString)) {
    const error = errorLevelError
    error.message = 'Must be a date'
    return error
  }
  return errorLevelNone
}

const _guessOperator = (a, b, currentOperator) => {
  grpStart('_guessOperator')
  yellow('a', a)
  yellow('b', b)
  yellow('currentOperator', currentOperator)
  if (a === b) {
    yellow('a===b', wdEquals)
    grpEnd()
    return wdEquals
  }
  if (a.length === b.length) {
    // TODO: not sure this is correct
    yellow('a.length===b.length', currentOperator)
    grpEnd()
    return currentOperator
  }
  if (a.startsWith(b)) {
    yellow('a startsWith b', wdBeginsWith)
    grpEnd()
    return wdBeginsWith
  }
  if (a.endsWith(b)) {
    yellow('a endsWith b', wdContains)
    grpEnd()
    return wdContains
  }
  if (a.includes(b)) {
    yellow('a contains b', wdContains)
    grpEnd()
    return wdContains
  }
  grpEnd()
  throw new Error('_guessOperator - unknown condition')
}

export const CriterionEdit = ({ criterion }) => {
  countTotal = countTotal + 1

  const [_valueErrorLevel, _setValueErrorLevel] = useState(errorLevelNone)
  const [_shouldGuessOperator, _setShouldGuessOperator] = useState(true)
  const [_origValue, _setOrigValue] = useState('')

  const { operator, field, value, active } = criterion
  if (field === 'description') {
    grpStart('criterion')
    green('criterion', criterion)
    green('operator', operator)
    green('field', field)
    green('value', value)
    green('_shouldGuessOperator', _shouldGuessOperator)
    grpEnd()
  }
  const [_operator, _setOperator] = useState()
  const [_field, _setField] = useState('')
  const [_value, _setValue] = useState('')
  const [_active, _setActive] = useState('')

  // green('operator', operator)

  useEffect(() => {
    _setOrigValue(value)
    // eslint-disable-next-line
  }, [])

  const _dispatch = useDispatch()

  const _onValueChange = (event) => {
    const { value } = event.target
    _setValue(value)

    // green('value', value)
    const newCriterion = _shouldGuessOperator
      ? R.mergeRight(criterion, {
          [wdValue]: value,
          [wdOperator]: _guessOperator(_origValue, value, operator)
        })
      : R.mergeRight(criterion, { [wdValue]: value })
    green('newCriterion', newCriterion)
    _dispatch(ruleEditCriterionUpdate(newCriterion))
  }

  const _onActiveChange = (event) => {
    const { checked } = event.target
    _setActive(checked)

    const newCriterion = R.mergeRight(criterion, { [wdActive]: checked })
    _dispatch(ruleEditCriterionUpdate(newCriterion))
  }

  const _onFieldChange = (event) => {
    const { value } = event.target
    _setField(value)

    const newCriterion = R.mergeRight(criterion, { [wdField]: value })
    _dispatch(ruleEditCriterionUpdate(newCriterion))
  }

  const _onOperatorChange = (event) => {
    const { value } = event.target
    _setShouldGuessOperator(false)
    const newCriterion = R.mergeRight(criterion, { [wdOperator]: value })
    _dispatch(ruleEditCriterionUpdate(newCriterion))
  }

  const _onBlur = (event) => {
    // purple('_onBlue')
    const { name, value } = event.target
    // grpStart('_onBlue')
    // green('name', name)
    // green('value', value)
    // grpEnd()

    // validation
    const validation =
      field === wdDate ? _validateDate(value) : _validateString(value)
    _setValueErrorLevel(validation)

    // update criterion
    const newProp = { [name]: value }
    const newCriterion = _mergeCriterionProp(newProp, criterion)
    if (newCriterion.active && validation.name === errorLevelNone.name) {
      _dispatch(ruleEditCriterionUpdate(newCriterion))
    }
  }

  countReturn = countReturn + 1
  return (
    <>
      <RenderCount
        componentName="CriterionEdit"
        countTotal={{ actual: countTotal, min: 4, max: 4 }}
        countReturn={{ actual: countReturn, min: 4, max: 4 }}
      />
      <RowDiv>
        <input
          type="checkbox"
          name={wdActive}
          checked={active}
          onChange={_onActiveChange}
        />
        <Select
          disabled={!active}
          maxWidth={125}
          minWidth={125}
          name={wdField}
          onBlur={_onBlur}
          onChange={_onFieldChange}
          value={field}
        >
          {criteriaFieldList.map((f) => (
            <option key={f.name} value={f.name}>
              {f.description}
            </option>
          ))}
        </Select>
        <Select
          disabled={!active}
          maxWidth={135}
          minWidth={135}
          name={wdOperator}
          onBlur={_onBlur}
          onChange={_onOperatorChange}
          value={operator}
        >
          {operatorList.map((o) => (
            <option key={o.name} value={o.name}>
              {o.description}
            </option>
          ))}
        </Select>
        <TextEditOrDatePicker
          disabled={!active}
          field={field}
          value={value}
          width={450}
          maxWidth={900}
          minWidth={500}
          name={wdValue}
          onChange={_onValueChange}
          onBlur={_onBlur}
          errorLevel={_valueErrorLevel}
        />
      </RowDiv>
    </>
  )
}

CriterionEdit.propTypes = {
  criterion: PropTypes.object.isRequired
}
