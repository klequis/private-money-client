import React from 'react'
import * as R from 'ramda'
import PropTypes from 'prop-types'
import styled from 'styled-components'

// eslint-disable-next-line
import { green } from 'logger'

const DescriptionTD = styled.td`
  border: 1px solid white;
  color: ${(props) => props.color};
`

const CategoryTD = styled.td`
  border: 1px solid white;
  color: ${(props) => props.color};
`

/*
    - isOriginalData: boolean 
      - true: the unmodified data
      - false: the data that can be modified by changes in actions
*/

export const TableRow = ({ data, isOriginalData, diffs }) => {
  const { date, description, amount, category1, category2 } = data

  const changeColor = isOriginalData ? 'red' : 'green'

  return (
    <tr>
      <td>{date}</td>
      <td>{description}</td>
      <td>{amount}</td>
    </tr>
  )
}

TableRow.propTypes = {
  data: PropTypes.object.isRequired,
  isOriginalData: PropTypes.bool.isRequired,
  diffs: PropTypes.object.isRequired
}
