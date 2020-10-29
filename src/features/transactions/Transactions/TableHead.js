import React from 'react'
import ColHead from './ColumnHead'
import { transactionFields as tFields } from 'features/transactions'

const TableHead = () => {
  return (
    <thead>
      <tr>
        <ColHead fieldName={tFields.date.name} />
        <ColHead fieldName={tFields.acctId.name} />
        <ColHead
          fieldName={tFields.description.name}
        />
        <ColHead fieldName={tFields.amount.name} />
        <ColHead
          fieldName={tFields.category1.name}
        />
        <ColHead
          fieldName={tFields.category2.name}
        />
        <ColHead fieldName={tFields.type.name} />
        <ColHead fieldName={tFields.omit.name} />
      </tr>
    </thead>
  )
}

export default TableHead
