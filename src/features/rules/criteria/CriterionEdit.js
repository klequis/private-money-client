import React, { useState } from 'react'
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
import DeleteButton from 'components/DeleteButton'

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
  if (a === b) {
    yellow('a===b', wdEquals)
    grpEnd()
    return wdEquals
  }
  if (a.length === b.length) {
    return currentOperator
  }
  if (a.startsWith(b)) {
    return wdBeginsWith
  }
  if (a.endsWith(b)) {
    return wdContains
  }
  if (a.includes(b)) {
    return wdContains
  }
  return currentOperator
}

export const CriterionEdit = ({ criterion, _criterionDelete }) => {
  countTotal = countTotal + 1

  const [_valueErrorLevel, _setValueErrorLevel] = useState(errorLevelNone)
  const [_shouldGuessOperator, _setShouldGuessOperator] = useState(true)

  const { operator, field, value, active, _id } = criterion
  // eslint-disable-next-line
  const [_origValue, _setOrigValue] = useState(value)
  const [_operator, _setOperator] = useState(operator)
  const [_field, _setField] = useState(field)
  const [_value, _setValue] = useState(value)
  const [_active, _setActive] = useState(active)

  const _dispatch = useDispatch()

  const _onValueChange = (event) => {
    const { value } = event.target
    _setValue(value)
    const guessedOperator = _guessOperator(_origValue, value, _operator)
    if (_shouldGuessOperator) {
      _setOperator(guessedOperator)
    }
    const newCriterion = _shouldGuessOperator
      ? R.mergeRight(criterion, {
        [wdValue]: value,
        [wdOperator]: guessedOperator
      })
      : R.mergeRight(criterion, { [wdValue]: value })
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
    _setOperator(value)
    _setShouldGuessOperator(false)
    const newCriterion = R.mergeRight(criterion, { [wdOperator]: value })
    _dispatch(ruleEditCriterionUpdate(newCriterion))
  }

  const _onBlur = (event) => {
    const { name, value } = event.target
    // validation
    const validation =
      _field === wdDate ? _validateDate(value) : _validateString(value)
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
          checked={_active}
          onChange={_onActiveChange}
        />
        <Select
          disabled={!_active}
          maxWidth={125}
          minWidth={125}
          name={wdField}
          onBlur={_onBlur}
          onChange={_onFieldChange}
          value={_field}
        >
          {criteriaFieldList.map((f) => (
            <option key={f.name} value={f.name}>
              {f.description}
            </option>
          ))}
        </Select>
        <Select
          disabled={!_active}
          maxWidth={135}
          minWidth={135}
          name={wdOperator}
          onBlur={_onBlur}
          onChange={_onOperatorChange}
          value={_operator}
        >
          {operatorList.map((o) => (
            <option key={o.name} value={o.name}>
              {o.description}
            </option>
          ))}
        </Select>
        <TextEditOrDatePicker
          disabled={!_active}
          errorLevel={_valueErrorLevel}
          field={_field}
          maxWidth={900}
          minWidth={500}
          name={wdValue}
          onBlur={_onBlur}
          onChange={_onValueChange}
          value={_value}
          width={450}
        />
        <DeleteButton id={_id} onClick={_criterionDelete} />
      </RowDiv>
    </>
  )
}

CriterionEdit.propTypes = {
  criterion: PropTypes.object.isRequired,
  _criterionDelete: PropTypes.func.isRequired,
}
