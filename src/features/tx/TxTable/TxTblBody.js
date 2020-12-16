import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { isNilOrEmpty } from 'lib/isNilOrEmpty'
import { txActiveIdSet } from 'features/tx'
import { selectOneTx } from 'features/selectors'
import { TxTblData } from './TxTblData'

// eslint-disable-next-line
import { green, red } from 'logger'

export const TxTblBody = ({ txId }) => {

  const dispatch = useDispatch()
  const transaction = useSelector((state) => selectOneTx(txId, state))
  const {
    _id,
    acctId,
    amount,
    category1,
    category2,
    date,
    description,
    omit,
    ruleIds,
    type
  } = transaction

  const _rowClick = () => {
    dispatch(txActiveIdSet(txId))
  }

  return (
    <>
      {/* <tbody> */}
      {/* <tbody onClick={_rowClick} className={showRow ? styles.rowIdShow : ''}> */}
      <tbody onClick={_rowClick}>
        <tr>
          <TxTblData>{date}</TxTblData>
          <TxTblData>{acctId}</TxTblData>
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
