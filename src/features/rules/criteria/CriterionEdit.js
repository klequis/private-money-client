import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { CheckBox } from 'components/CheckBox'
import { ruleEditCriterionUpdate } from 'features/rules'
import * as R from 'ramda'
import styled from 'styled-components'
import { Select } from 'components/Select'
import { criteriaFieldList } from 'features/rules'
import { operatorList } from 'features/rules'
import { isStringDate } from 'lib/dataTypes'
import { TextEditOrDatePicker } from 'components/TextEditOrDatePicker'
import { errorLevels } from 'globalConstants'

/* eslint-disable */
import { green, redf, purple, grpStart, grpEnd } from 'logger'
import { RenderCount } from 'components/RenderCount'
import { wdActive, wdCheckbox, wdDate, wdField, wdOperation, wdValue } from 'appWords'
/* eslint-enable */

let countTotal = 0
let countReturn = 0

const { errorLevelNone, errorLevelError } = errorLevels

const RowDiv = styled.div`
  display: flex;
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

export const CriterionEdit = ({ criterion }) => {
  countTotal = countTotal + 1

  const [_criterion, _setCriterion] = useState(criterion)
  const [_valueErrorLevel, _setValueErrorLevel] = useState(errorLevelNone)

  const { operation, field, value, active } = _criterion

  const _dispatch = useDispatch()

  const _onChange = (event) => {
    const { name, value, checked, type } = event.target
    const newProp = { [name]: type === wdCheckbox ? checked : value }
    const newCriterion = _mergeCriterionProp(newProp, _criterion)
    _setCriterion(newCriterion)
    _dispatch(ruleEditCriterionUpdate(newCriterion))
  }

  const _onBlur = (event) => {
    const { name, value } = event.target

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
        <CheckBox name={wdActive} checked={active} onChange={_onChange} />
        <Select
          disabled={!active}
          maxWidth={125}
          name={wdField}
          onBlur={_onBlur}
          onChange={_onChange}
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
          maxWidth={125}
          name={wdOperation}
          onBlur={_onBlur}
          onChange={_onChange}
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
          maxWidth={900}
          minWidth={500}
          name={wdValue}
          onChange={_onChange}
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
