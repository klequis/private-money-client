import React from 'react'
import { ColumnHead } from './ColumnHead'
import { transactionFields as tFields } from 'features/transactions'

export const TableHead = () => {
  return (
    <thead>
      <tr>
        <ColumnHead fieldName={tFields.date.name} />
        <ColumnHead fieldName={tFields.acctId.name} />
        <ColumnHead fieldName={tFields.description.name} />
        <ColumnHead fieldName={tFields.amount.name} />
        <ColumnHead fieldName={tFields.category1.name} />
        <ColumnHead fieldName={tFields.category2.name} />
        <ColumnHead fieldName={tFields.type.name} />
        <ColumnHead fieldName={tFields.omit.name} />
      </tr>
    </thead>
  )
}
