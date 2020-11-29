import React from 'react'
import { TxColHead } from './TxColHead'
import { txFields } from 'features/tx'

export const TxTblHead = () => {
  return (
    <thead>
      <tr>
        <TxColHead fieldName={txFields.date.name} />
        <TxColHead fieldName={txFields.acctId.name} />
        <TxColHead fieldName={txFields.description.name} />
        <TxColHead fieldName={txFields.amount.name} />
        <TxColHead fieldName={txFields.category1.name} />
        <TxColHead fieldName={txFields.category2.name} />
        <TxColHead fieldName={txFields.type.name} />
        <TxColHead fieldName={txFields.omit.name} />
      </tr>
    </thead>
  )
}
