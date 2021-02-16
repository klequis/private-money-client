import React from 'react'
import { TableRow } from './TableRow'
import styled from 'styled-components'
import * as R from 'ramda'
import { wdOmit } from 'appWords'

// eslint-disable-next-line
import { green } from 'logger'

const StrikethroughTD = styled.td`
  text-decoration: line-through;
  color: red;
`
const makeOldData = ({
  date,
  description,
  origDescription,
  amount,
  category1,
  category2,
  type,
  ruleIds
}) => {
  return {
    date,
    description,
    origDescription,
    amount,
    category1,
    category2,
    type,
    ruleIds
  }
}

const makeNewData = (actions, transaction) => {
  const { replaceWithValue } = actions[0]
  const { category1, category2 } = actions[1]

  const { date, amount, origDescription, ruleIds, type } = transaction

  return {
    date: date,
    description: replaceWithValue,
    origDescription: origDescription,
    amount: amount,
    category1: category1,
    category2: category2,
    type: type,
    ruleIds: ruleIds
  }
}

const _isDiff = (value1, value2) => value1 !== value2

/**
 *
 * @param {object} oldFields { date, description, amount, category1, category2 }
 * @param {object} newFields { date, description, amount, category1, category2 }
 * @returns {object} { description: boolean, category1: boolean, category2: boolean}
 */
const createDiffs = (oldFields, newFields) => {
  return {
    description: _isDiff(oldFields.description, newFields.description),
    category1: _isDiff(oldFields.category1, newFields.category1),
    category2: _isDiff(oldFields.category2, newFields.category2)
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
  if (actions.length === 1 && actions[0].actionType === wdOmit) {
    const { date, description, amount } = transaction
    return (
      <tbody>
        <tr>
          <StrikethroughTD>{date}</StrikethroughTD>
          <StrikethroughTD>{description}</StrikethroughTD>
          <StrikethroughTD>{amount}</StrikethroughTD>
        </tr>
      </tbody>
    )
  }

  const _oldData = makeOldData(transaction)
  const _newData = makeNewData(actions, transaction)
  const _diffs = createDiffs(_oldData, _newData)
  const _hasDiffs = R.any(R.equals(R.__, true))(R.values(_diffs))

  return (
    <tbody>
      <TableRow data={_oldData} isOriginalData={true} diffs={_diffs} />
      {_hasDiffs ? (
        <TableRow data={_newData} isOriginalData={false} diffs={_diffs} />
      ) : null}
    </tbody>
  )
}
