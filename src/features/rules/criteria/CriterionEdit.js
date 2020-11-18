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
import { isNilOrEmpty } from 'lib/isNilOrEmpty'
import { isStringDate } from 'lib/dataTypes'
import { TextEditOrDatePicker } from 'components/TextEditOrDatePicker'
import { errorLevels } from 'globalConstants'

// eslint-disable-next-line
import { green, redf, purple } from 'logger'
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
  const [_valueEditLevel, _setValueErrorLevel] = useState(errorLevelNone)

  const { operation, field, value, active } = _criterion

  const dispatch = useDispatch()

  const _handleChange = (event) => {
    const { name, value, checked, type } = event.currentTarget
    const newProp = { [name]: type === 'checkbox' ? checked : value }
    const newCriterion = _mergeCriterionProp(newProp, _criterion)
    green('CriterionEdit: _handleChange', newCriterion)
    _setCriterion(newCriterion)
    dispatch(ruleEditCriterionUpdate(newCriterion))
  }

  const _handleBlur = (event) => {
    const { name, value } = event.target
    // green('name', name)
    // green('value', value)
    // green('field', field)

    // validation
    const validation =
      field === 'date' ? _validateDate(value) : _validateString(value)
    _setValueErrorLevel(validation)

    // update criterion
    const newProp = { [name]: value }
    const newCriterion = _mergeCriterionProp(newProp, _criterion)
    green('CriterionEdit: _handleBlur', newCriterion)
    _setCriterion(newCriterion)
    if (newCriterion.active && isNilOrEmpty(validation)) {
      dispatch(ruleEditCriterionUpdate(newCriterion))
    }
  }

  countReturn = countReturn + 1
  return (
    <Row>
      {/* <RenderCount
          componentName="CriterionEdit"
          countTotal={{ actual: countTotal, min: 4, max: 4 }}
          countReturn={{ actual: countReturn, min: 4, max: 4 }}
        /> */}
      {/* <CheckDiv id='CheckDiv'> */}
      <CheckBox name="active" checked={active} onChange={_handleChange} />
      <Select
        disabled={!active}
        maxWidth={125}
        name="field"
        onBlur={_handleBlur}
        onChange={_handleChange}
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
        onBlur={_handleBlur}
        onChange={_handleChange}
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
        initialValue={value}
        maxWidth={900}
        minChars={3}
        name="value"
        onChange={_handleChange}
        onBlur={_handleBlur}
        errorLevel={_valueEditLevel}
      />
    </Row>
  )
}

CriterionEdit.propTypes = {
  criterion: PropTypes.object.isRequired
}