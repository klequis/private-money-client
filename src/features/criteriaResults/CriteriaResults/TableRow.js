import React from 'react'
import * as R from 'ramda'
import { dataTypes } from 'lib/dataTypes'

// eslint-disable-next-line
import { green } from 'logger'

const TD = ({ color, diff, value, origDescription }) => {
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
  const {
    date,
    description,
    amount,
    category1,
    category2,
    origDescription
  } = data
  const color = isNewData ? 'green' : 'red'

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
