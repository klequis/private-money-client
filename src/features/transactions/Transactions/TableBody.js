import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { isNilOrEmpty } from 'lib/isNilOrEmpty'
import {
  selectOneTransaction,
  activeTransactionSet,
  selectActiveTransactionId,
} from 'features/transactions'
import styles from './TableBody.module.css'
import AllDataTableData from './TableData'

// eslint-disable-next-line
import { green, red } from 'logger'

const TableRow = ({ transactionId }) => {
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
    dispatch(activeTransactionSet(transactionId))
  }

  return (
    <>
      <tbody onClick={_rowClick} className={showRow ? styles.rowIdShow : ''}>
        <tr>
          <AllDataTableData>{date}</AllDataTableData>
          <AllDataTableData>{acctId}</AllDataTableData>
          {/* <AllDataTableData align="left">
            <div>{description}</div>
            {_id === activeTransactionId ? <div>{origDescription}</div> : null}
          </AllDataTableData> */}
          <AllDataTableData align="left">{description}</AllDataTableData>
          <AllDataTableData>{amount}</AllDataTableData>
          <AllDataTableData>{category1}</AllDataTableData>
          <AllDataTableData>{category2}</AllDataTableData>
          <AllDataTableData>{type}</AllDataTableData>
          <AllDataTableData>{omit ? 'yes' : 'no'}</AllDataTableData>
          <AllDataTableData align="center">
            {isNilOrEmpty(ruleIds)
              ? null
              : ruleIds.map((id) => <div key={id}>{id}</div>)}
          </AllDataTableData>
        </tr>
      </tbody>
    </>
  )
}

export default TableRow
