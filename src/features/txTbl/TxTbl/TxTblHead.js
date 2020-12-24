import React from 'react'
import { TxTblColHead } from './TxTblColHead'
import { txFields } from 'features/tx'

export const TxTblHead = () => {
  return (
    <thead>
      <tr>
        <TxTblColHead fieldName={txFields.date.name} fieldDescription={txFields.date.description} align="left" />
        <TxTblColHead fieldName={txFields.acctId.name} fieldDescription={txFields.acctId.description} align="left" />
        <TxTblColHead fieldName={txFields.description.name} fieldDescription={txFields.description.description} align="left" />
        <TxTblColHead fieldName={txFields.amount.name} fieldDescription={txFields.amount.description} align="right" />
        <TxTblColHead fieldName={txFields.category1.name} fieldDescription={txFields.category1.description} align="right" />
        <TxTblColHead fieldName={txFields.category2.name} fieldDescription={txFields.category2.description} align="right" />
        <TxTblColHead fieldName={txFields.type.name} fieldDescription={txFields.type.description} align="right" />
        <TxTblColHead fieldName={txFields.omit.name} fieldDescription={txFields.omit.description} align="right" />
      </tr>
    </thead>
  )
}
