import React from 'react'
import { TableRow } from './TableRow'
import styled from 'styled-components'
import * as R from 'ramda'

// eslint-disable-next-line
import { green } from 'logger'

const TDStrikethrough = styled.td`
  text-decoration: line-through;
  color: red;
`
const makeOldData = ({
  date,
  description,
  origDescription,
  amount,
  category1,
  category2
}) => {
  return {
    date,
    description,
    origDescription,
    amount,
    category1,
    category2
  }
}

const makeNewData = (actions, transaction) => {
  const { replaceWithValue } = actions[0]
  const { category1, category2 } = actions[1]

  const { date, amount } = transaction

  return {
    date: date,
    description: replaceWithValue,
    amount: amount,
    category1,
    category2: category2
  }
}

const isDiff = (value1, value2) => value1 !== value2

/**
 *
 * @param {object} oldFields { date, description, amount, category1, category2 }
 * @param {object} newFields { date, description, amount, category1, category2 }
 * @returns {object} { description: boolean, category1: boolean, category2: boolean}
 */
const createDiffs = (oldFields, newFields) => {
  return {
    description: isDiff(oldFields.description, newFields.description),
    category1: isDiff(oldFields.category1, newFields.category1),
    category2: isDiff(oldFields.category2, newFields.category2)
  }
}

/*
    If there is an actionType of 'omit' it is a special case.
    There will be only one action and its actionType property
    will equal 'omit'. In this case, apply strikethrough font
    to all criteriaResult transactions.

    If actionType==='omit'
      return two table rows with strike-through

*/
export const TableBody = ({ actions, transaction }) => {
  if (actions.length === 1 && actions[0].actionType === 'omit') {
    const { date, description, amount } = transaction
    return (
      <tbody>
        <tr>
          <TDStrikethrough>{date}</TDStrikethrough>
          <TDStrikethrough>{description}</TDStrikethrough>
          <TDStrikethrough>{amount}</TDStrikethrough>
        </tr>
      </tbody>
    )
  }

  const oldData = makeOldData(transaction)
  const newData = makeNewData(actions, transaction)
  const diffs = createDiffs(oldData, newData)
  const hasDiffs = R.any(R.equals(R.__, true))(R.values(diffs))

  return (
    <tbody>
      <TableRow data={oldData} isOriginalData={true} diffs={diffs} />
      {hasDiffs ? (
        <TableRow data={newData} isOriginalData={false} diffs={diffs} />
      ) : null}
    </tbody>
  )
}
