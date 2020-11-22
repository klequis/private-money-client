import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { isNilOrEmpty } from 'lib/isNilOrEmpty'
import {
  selectOneTransaction,
  activeTransactionIdSet,
  selectActiveTransactionId
} from 'features/transactions'
import styles from './TableBody.module.css'
import { TableData } from './TableData'

// eslint-disable-next-line
import { green, red } from 'logger'

export const TableBody = ({ transactionId }) => {
  const dispatch = useDispatch()

  const activeTransactionId = useSelector(selectActiveTransactionId)
  const showRow = activeTransactionId === transactionId
  const transaction = useSelector((state) =>
    selectOneTransaction(transactionId, state)
  )
  const {
    _id,
    acctId,
    amount,
    category1,
    category2,
    date,
    description,
    omit,
    origDescription,
    ruleIds,
    type
  } = transaction

  const _rowClick = () => {
    dispatch(activeTransactionIdSet(transactionId))
  }

  return (
    <>
      <tbody onClick={_rowClick} className={showRow ? styles.rowIdShow : ''}>
        <tr>
          <TableData>{date}</TableData>
          <TableData>{acctId}</TableData>
          {/* <TableData align="left">
            <div>{description}</div>
            {_id === activeTransactionId ? <div>{origDescription}</div> : null}
          </TableData> */}
          <TableData align="left">
            <div>{description}</div>
            <div>{_id}</div>
          </TableData>
          <TableData>{amount}</TableData>
          <TableData>{category1}</TableData>
          <TableData>{category2}</TableData>
          <TableData>{type}</TableData>
          <TableData>{omit ? 'yes' : 'no'}</TableData>
          <TableData align="center">
            {isNilOrEmpty(ruleIds)
              ? null
              : ruleIds.map((id) => <div key={id}>{id}</div>)}
          </TableData>
        </tr>
      </tbody>
    </>
  )
}
