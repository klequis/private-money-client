import React from 'react'
import { ColumnHead } from './ColumnHead'
import { txFields } from 'features/tx'

export const TableHead = () => {
  return (
    <thead>
      <tr>
        <ColumnHead fieldName={txFields.date.name} />
        <ColumnHead fieldName={txFields.acctId.name} />
        <ColumnHead fieldName={txFields.description.name} />
        <ColumnHead fieldName={txFields.amount.name} />
        <ColumnHead fieldName={txFields.category1.name} />
        <ColumnHead fieldName={txFields.category2.name} />
        <ColumnHead fieldName={txFields.type.name} />
        <ColumnHead fieldName={txFields.omit.name} />
      </tr>
    </thead>
  )
}
