import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { isNilOrEmpty } from 'lib/isNilOrEmpty'
import { txActiveIdSet } from 'features/tx'
import { selectOneTx } from 'features/selectors'
import { TxTblData } from './TxTblData'
import styled from 'styled-components'

// eslint-disable-next-line
import { green, red } from 'logger'

const TxTblTr = styled.tr`
  cursor: pointer;
`

export const TxTblBody = ({ txId }) => {
  const _dispatch = useDispatch()
  const _transaction = useSelector((state) => selectOneTx(txId, state))
  const {
    acctId,
    amount,
    category1,
    category2,
    date,
    description,
    omit,
    ruleIds,
    type
  } = _transaction

  const _rowClick = () => {
    _dispatch(txActiveIdSet(txId))
  }

  const formatAmount = (amount) => {
    return amount.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })
  }

  return (
    <>
      <tbody onClick={_rowClick}>
        <TxTblTr>
          <TxTblData align="left">{date}</TxTblData>
          <TxTblData align="left">{acctId}</TxTblData>
          <TxTblData align="left">
            <div>{description}</div>
          </TxTblData>
          <TxTblData color={amount > 0 ? '#00bc8c' : '#e74c3c'} align="right">
            {formatAmount(amount)}
          </TxTblData>
          <TxTblData align="right">{category1}</TxTblData>
          <TxTblData align="right">{category2}</TxTblData>
          <TxTblData align="right">{type}</TxTblData>
          <TxTblData align="right">{omit ? 'yes' : 'no'}</TxTblData>
          <TxTblData align="center">
            {isNilOrEmpty(ruleIds)
              ? null
              : ruleIds.map((id) => <div key={id}>{id}</div>)}
          </TxTblData>
        </TxTblTr>
      </tbody>
    </>
  )
}
