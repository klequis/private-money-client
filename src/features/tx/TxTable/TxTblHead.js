import React from 'react'
import { TxColHead } from './TxColHead'
import { txFields } from 'features/tx'

export const TxTblHead = () => {
  return (
    <thead>
      <tr>
        <TxColHead fieldName={txFields.date.name} fieldDescription={txFields.date.description} align="left" />
        <TxColHead fieldName={txFields.acctId.name} fieldDescription={txFields.acctId.description} align="left" />
        <TxColHead fieldName={txFields.description.name} fieldDescription={txFields.description.description} align="left" />
        <TxColHead fieldName={txFields.amount.name} fieldDescription={txFields.amount.description} align="right" />
        <TxColHead fieldName={txFields.category1.name} fieldDescription={txFields.category1.description} align="right" />
        <TxColHead fieldName={txFields.category2.name} fieldDescription={txFields.category2.description} align="right" />
        <TxColHead fieldName={txFields.type.name} fieldDescription={txFields.type.description} align="right" />
        <TxColHead fieldName={txFields.omit.name} fieldDescription={txFields.omit.description} align="right" />
      </tr>
    </thead>
  )
}
