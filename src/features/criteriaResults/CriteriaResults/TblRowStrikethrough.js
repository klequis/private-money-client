import React from 'react'
import PropTypes from 'prop-types'

// eslint-disable-next-line
import { green } from 'logger'

/*
    - isOriginalData: boolean 
      - true: the unmodified data
      - false: the data that can be modified by changes in actions
*/

export const TableRow = ({ data }) => {
  const { date, description, amount } = data

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
}
