import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { isNilOrEmpey, isNilOrEmpty } from 'lib/isNilOrEmpty'

// eslint-disable-next-line
import { green, redf, yellow } from 'logger'

const Label = styled.label``

export const InputLabel = ({ labelText }) => {
  return isNilOrEmpty(labelText) ? null : <Label>{labelText}</Label>
}

InputLabel.propTypes = {
  labelText: PropTypes.string
}
