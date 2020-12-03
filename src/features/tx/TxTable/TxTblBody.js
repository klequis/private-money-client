import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { isNilOrEmpty } from 'lib/isNilOrEmpty'
import {
  txActiveIdSet,
} from 'features/tx'
import {
  selectOneTx,
  // selectActiveTransactionId
} from 'features/selectors'
// TODO: needed? import styles from './TableBody.module.css'
import { TxTblData } from './TxTblData'

// eslint-disable-next-line
import { green, red } from 'logger'

export const TxTblBody = ({ transactionId }) => {
  const dispatch = useDispatch()


  // TODO: Should the original description be shown when the row is clicked on?
  // const activeTransactionId = useSelector(selectActiveTransactionId)
  // const showRow = activeTransactionId === transactionId
  const transaction = useSelector((state) =>
    selectOneTx(transactionId, state)
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
    // origDescription,
    ruleIds,
    type
  } = transaction

  const _rowClick = () => {
    green('_rowClick: transactionId', transactionId)
    dispatch(txActiveIdSet(transactionId))
  }

  return (
    <>
      {/* <tbody> */}
      {/* <tbody onClick={_rowClick} className={showRow ? styles.rowIdShow : ''}> */}
      <tbody onClick={_rowClick}>
        <tr>
          <TxTblData>{date}</TxTblData>
          <TxTblData>{acctId}</TxTblData>
          {/* <TableData align="left">
            <div>{description}</div>
            {_id === activeTransactionId ? <div>{origDescription}</div> : null}
          </TableData> */}
          <TxTblData align="left">
            <div>{description}</div>
            <div>{_id}</div>
          </TxTblData>
          <TxTblData>{amount}</TxTblData>
          <TxTblData>{category1}</TxTblData>
          <TxTblData>{category2}</TxTblData>
          <TxTblData>{type}</TxTblData>
          <TxTblData>{omit ? 'yes' : 'no'}</TxTblData>
          <TxTblData align="center">
            {isNilOrEmpty(ruleIds)
              ? null
              : ruleIds.map((id) => <div key={id}>{id}</div>)}
          </TxTblData>
        </tr>
      </tbody>
    </>
  )
}
