import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { CheckBox } from 'components/CheckBox'
import { ruleEditCriterionUpdate } from 'features/ruleEdit'
import * as R from 'ramda'
import styled from 'styled-components'
import { Select } from 'components/Select'
import { criteriaFieldList } from 'features/rules'
import { operatorList } from 'features/rules'
import { isStringDate } from 'lib/dataTypes'
import { TextEditOrDatePicker } from 'components/TextEditOrDatePicker'
import { errorLevels } from 'globalConstants'

// eslint-disable-next-line
import { green, redf, purple, grpStart, grpEnd } from 'logger'
// eslint-disable-next-line
import { RenderCount } from 'components/RenderCount'

let countTotal = 0
let countReturn = 0

const { errorLevelNone, errorLevelWarn, errorLevelError } = errorLevels

const Row = styled.div`
  display: flex;
`

/**
 *
 * @param {object} newProp
 * @param {object} criterion
 */
const _mergeCriterionProp = (newProp, criterion) => {
  return R.mergeRight(criterion, newProp)
}

/**
 *
 * @param {string} value
 * @returns {object}
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
 * @param {string} dateString
 * @returns {object}
 */
const _validateDate = (dateString) => {
  // green('dateString', dateString)
  // green('isStringDate(dateString)', isStringDate(dateString))
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

  grpStart('CriterionEDit')
  green('criterion', criterion)
  green('_criterion', _criterion)
  grpEnd()

  const dispatch = useDispatch()

  const _onChange = (event) => {
    const { name, value, checked, type } = event.target
    const newProp = { [name]: type === 'checkbox' ? checked : value }
    const newCriterion = _mergeCriterionProp(newProp, _criterion)
    green('CriterionEdit: _handleChange', newCriterion)
    _setCriterion(newCriterion)
    dispatch(ruleEditCriterionUpdate(newCriterion))
  }

  const _onBlur = (event) => {
    const { name, value } = event.target
    // green('name', name)
    // green('value', value)
    // green('field', field)

    // validation
    const validation =
      field === 'date' ? _validateDate(value) : _validateString(value)
    _setValueErrorLevel(validation)
    green('validation', validation)

    // update criterion
    const newProp = { [name]: value }
    const newCriterion = _mergeCriterionProp(newProp, _criterion)
    green('CriterionEdit: _handleBlur', newCriterion)
    _setCriterion(newCriterion)
    if (newCriterion.active && validation.name === errorLevelNone.name) {
      green('should it update', '?')
      dispatch(ruleEditCriterionUpdate(newCriterion))
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
      <Row>
        {/* <CheckDiv id='CheckDiv'> */}
        <CheckBox name="active" checked={active} onChange={_onChange} />
        <Select
          disabled={!active}
          maxWidth={125}
          name="field"
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
          name="operation"
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
          name="value"
          onChange={_onChange}
          onBlur={_onBlur}
          errorLevel={_valueErrorLevel}
        />
      </Row>
    </>
  )
}

CriterionEdit.propTypes = {
  criterion: PropTypes.object.isRequired
}
