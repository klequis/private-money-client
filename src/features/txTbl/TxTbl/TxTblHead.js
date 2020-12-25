import React from 'react'
import { TxTblColHead } from './TxTblColHead'
import { txFields } from 'features/tx'

export const TxTblHead = () => {
  return (
    <thead>
      <tr>
        <TxTblColHead fieldName={txFields.date.name} />
        <TxTblColHead fieldName={txFields.acctId.name} />
        <TxTblColHead fieldName={txFields.description.name} />
        <TxTblColHead fieldName={txFields.amount.name} />
        <TxTblColHead fieldName={txFields.category1.name} />
        <TxTblColHead fieldName={txFields.category2.name} />
        <TxTblColHead fieldName={txFields.type.name} />
        <TxTblColHead fieldName={txFields.omit.name} />
      </tr>
    </thead>
  )
}
