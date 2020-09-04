import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import TableData from './TableData'
import isNilOrEmpty from 'lib/isNilOrEmpty'
import Rules from 'features/rules/Rules'
import {
  selectOneTransaction,
  setRowIdShow,
  selectRowIdShow
} from 'features/transactions/transactionsSlice'
import styles from './TableBody.module.css'

// eslint-disable-next-line
import { green, red } from 'logger'

const TableRow = ({ transactionId }) => {
  const dispatch = useDispatch()
  const rowIdShow = useSelector(selectRowIdShow)
  const showRow = rowIdShow === transactionId
  const transaction = useSelector((state) =>
    selectOneTransaction(transactionId, state)
  )
  const {
    _id,
    acctId,
    category1,
    category2,
    credit,
    date,
    debit,
    description,
    omit,
    origDescription,
    ruleIds,
    type
  } = transaction

  const _rowClick = () => {
    dispatch(setRowIdShow(transactionId))
  }
  // #6c757d

  return (
    <>
      <tbody onClick={_rowClick} className={showRow ? styles.rowIdShow : ''}>
        <tr>
          <TableData>{date}</TableData>
          <TableData>{acctId}</TableData>
          <TableData align="left">
            <div>{description}</div>
            {_id === rowIdShow ? <div>{origDescription}</div> : null}
          </TableData>
          <TableData>{credit}</TableData>
          <TableData>{debit}</TableData>
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
        {rowIdShow === transactionId ? (
          <Rules transactionId={transactionId} />
        ) : null}
      </tbody>
    </>
  )
}

export default TableRow
