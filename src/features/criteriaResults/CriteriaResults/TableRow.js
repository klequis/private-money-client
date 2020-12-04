import React from 'react'
import * as R from 'ramda'
import { dataTypes } from 'lib/dataTypes'
import PropTypes from 'prop-types'
import styled from 'styled-components'

// eslint-disable-next-line
import { green } from 'logger'

// const TD = ({ color, diff, value, origDescription }) => {
//   if (diff) {
//     if (!R.type(origDescription) === dataTypes.Undefined) {
//     } else {
//       return <td style={{ color: 'green' }}>{<></>}</td>
//     }
//   }
//   return <td>{value}</td>
// }

const DescriptionTD = styled.td`
  border: 1px solid white;
  color: ${props => props.color};
`

const CategoryTD = styled.td`
  border: 1px solid white;
  color: ${props => props.color};
`

/*
    - is it newData or OriginalData
    - are there differences or not

*/

/*
    - isNewData: boolean 
      - true: the unmodified data
      - false: the data that can be modified by changes in actions
*/

export const TableRow = ({ data, isOriginalData, diffs }) => {
  const {
    date,
    description,
    amount,
    category1,
    category2,
  } = data
  // const showCategoryDiff = shoulsdShowCategoryDiff(category1, category2)

  const changeColor = isOriginalData ? 'red' : 'green'

  return (
    <tr>
      <td>{date}</td>
      <DescriptionTD
        color={diffs.description ? changeColor : 'inherit'}
      >
        {description}
      </DescriptionTD>
      <td>{amount}</td>
      <CategoryTD color={diffs.description ? changeColor : 'inherit'}>
        {diffs.category1 ? (R.isEmpty(category1) ? '(blank)' : category1) : ''}
      </CategoryTD>
      <CategoryTD color={diffs.description ? changeColor : 'inherit'}>
        {diffs.category2 ? (R.isEmpty(category2) ? '(blank)' : category2) : ''}
      </CategoryTD>
    </tr>
  )
}

TableRow.propTypes = {
  data: PropTypes.object.isRequired,
  isOriginalData: PropTypes.bool.isRequired,
  diffs: PropTypes.object.isRequired
}