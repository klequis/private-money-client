import React from 'react'
import { TxColHead } from './TxColHead'
import { txFields } from 'features/tx'

export const TxTblHead = () => {
  console.log(txFields);
  return (
    <thead>
      <tr>
        <TxColHead fieldName={txFields.date.name} align="left" />
        <TxColHead fieldName={txFields.acctId.name} align="left" />
        <TxColHead fieldName={txFields.description.name} align="left" />
        <TxColHead fieldName={txFields.amount.name} align="right" />
        <TxColHead fieldName={txFields.category1.name} align="right" />
        <TxColHead fieldName={txFields.category2.name} align="right" />
        <TxColHead fieldName={txFields.type.name} align="right" />
        <TxColHead fieldName={txFields.omit.name} align="right" />
      </tr>
    </thead>
  )
}
