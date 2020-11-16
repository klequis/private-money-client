import React from 'react'
// import { useSelector } from 'react-redux'
import * as R from 'ramda'
import { dataTypes } from 'lib/dataTypes'
// eslint-disable-next-line
import { green } from 'logger'

// const newTableRow = ({ oldFields, newFields }) => {
//   if (hasDiffs(diffs)) {

//   }
//   return null
// }

// color
// diff

const TD = ({ color, diff, value, origDescription }) => {
  // console.group('TD')
  // green('color', color)
  // green('diff', diff)
  // green('value', value)
  // green('origDescription', R.type(origDescription))
  // console.groupEnd()
  if (diff) {
    if (!R.type(origDescription) === dataTypes.Undefined) {
      return (
        <td style={{ color: color }}>{R.isEmpty(value) ? '(blank)' : value}</td>
      )
    } else {
      return (
        <td style={{ color: color }}>
          {
            <>
              <div>{R.isEmpty(value) ? '(blank)' : value}</div>
              <div
                style={{
                  color: 'grey',
                  fontSize: '0.7em'
                }}
              >
                {origDescription}
              </div>
            </>
          }
        </td>
      )
    }
  }
  return <td>{value}</td>
}

export const TableRow = ({ data, isNewData, diffs }) => {
  // green('data', data)
  const {
    date,
    description,
    amount,
    category1,
    category2,
    origDescription
  } = data
  const color = isNewData ? 'green' : 'red'
  // console.group('TableRow')
  // green('isNewData', isNewData)
  // green('color', color)
  // green('diffs', diffs)
  // console.groupEnd()

  return (
    <tr>
      <td>{date}</td>
      <TD
        color={color}
        diff={diffs.description}
        value={description}
        origDescription={origDescription}
      />
      <td>{amount}</td>
      <TD color={color} diff={diffs.category1} value={category1} />
      <TD color={color} diff={diffs.category2} value={category2} />
    </tr>
  )
}
