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
  wdField,
  wdOperation,
  wdValue
} from 'appWords'

/* eslint-disable */
import { green, redf, purple, grpStart, grpEnd } from 'logger'
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

const _guessOperation = (a, b) => {
  if (a === b || a.length === b.length) {
    return ''
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
  return ''
}

export const CriterionEdit = ({ criterion }) => {
  countTotal = countTotal + 1

  const [_criterion, _setCriterion] = useState(criterion)
  const [_valueErrorLevel, _setValueErrorLevel] = useState(errorLevelNone)
  const [_shouldGuessOperation, _setShouldGuessOperation] = useState(true)
  const [_origValue, _setOrigValue] = useState('')
  // const { operation, field, value, active } = _criterion
  const { operation, field, value, active } = criterion

  green('_criterion', criterion)

  useEffect(() => {
    _setOrigValue(value)
    // eslint-disable-next-line
  }, [])

  const _dispatch = useDispatch()

  const _onActiveChange = (event) => {
    purple('_onActiveChange')
    const { checked } = event.target
    const newCriterion = R.mergeRight(_criterion, { [wdActive]: checked })
    _setCriterion(newCriterion)
    _dispatch(ruleEditCriterionUpdate(newCriterion))
  }

  const _onFieldChange = (event) => {
    purple('_onFieldChange')
    const { value } = event.target
    const newCriterion = R.mergeRight(_criterion, { [wdField]: value })
    _setCriterion(newCriterion)
    _dispatch(ruleEditCriterionUpdate(newCriterion))
  }

  const _onOperationChange = (event) => {
    purple('_onOperationChange')
    const { value } = event.target
    _setShouldGuessOperation(false)
    const newCriterion = R.mergeRight(_criterion, { [wdOperation]: value })
    _dispatch(ruleEditCriterionUpdate(newCriterion))
  }

  const _onValueChange = (event) => {
    purple('_onValueChange')
    const { value } = event.target
    green('value', value)
    const newCriterion = _shouldGuessOperation
      ? R.mergeRight(_criterion, {
          [wdValue]: value,
          [wdOperation]: _guessOperation(_origValue, value)
        })
      : R.mergeRight(_criterion, { [wdValue]: value })
    green('newCriterion', newCriterion)
    _dispatch(ruleEditCriterionUpdate(newCriterion))
  }

  const _onBlur = (event) => {
    purple('_onBlue')
    const { name, value } = event.target
    grpStart('_onBlue')
    green('name', name)
    green('value', value)
    grpEnd()

    // validation
    const validation =
      field === wdDate ? _validateDate(value) : _validateString(value)
    _setValueErrorLevel(validation)

    // update criterion
    const newProp = { [name]: value }
    const newCriterion = _mergeCriterionProp(newProp, _criterion)
    _setCriterion(newCriterion)
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
          name={wdOperation}
          onBlur={_onBlur}
          onChange={_onOperationChange}
          value={operation}
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
