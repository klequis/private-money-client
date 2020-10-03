import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import TableData from './TableData'
import isNilOrEmpty from 'lib/isNilOrEmpty'
import Rules from 'features/rules/Rules'
import {
  selectOneTransaction,
  setActiveTransactionId,
  selectActiveTransactionId,
  // selectTransactionRuleIds
} from 'features/transactions/transactionsSlice'
import styles from './TableBody.module.css'
// import { setRuleEdit } from 'features/rules/rulesSlice'
// import Form from 'react-bootstrap/Form'

// eslint-disable-next-line
import { green, red } from 'logger'

const TableRow = ({ transactionId }) => {
  const dispatch = useDispatch()

  const activeTransactionId = useSelector(selectActiveTransactionId)

  // green('TableRow: transactionId', transactionId)
  // green('TableRow: activeTransactionId', activeTransactionId)

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
    dispatch(setActiveTransactionId(transactionId))
  }

  return (
    <>
      <tbody onClick={_rowClick} className={showRow ? styles.rowIdShow : ''}>
        <tr>
          <TableData>{date}</TableData>
          <TableData>{acctId}</TableData>
          <TableData align="left">
            <div>{description}</div>
            {_id === activeTransactionId ? <div>{origDescription}</div> : null}
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
        {activeTransactionId === transactionId ? (
          <Rules transactionId={transactionId} />
        ) : null}
      </tbody>
    </>
  )
}

export default TableRow
