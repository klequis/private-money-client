import React from 'react'
import ColHead from './ColumnHead'
import { transactionFields as tFields } from 'features/transactions'

const TableHead = ({ setFilter }) => {
  return (
    <thead>
      <tr>
        <ColHead fieldName={tFields.date.name} setFilter={setFilter} />
        <ColHead fieldName={tFields.acctId.name} setFilter={setFilter} />
        <ColHead
          fieldName={tFields.description.name}
          setFilter={setFilter}
        />
        <ColHead fieldName={tFields.amount.name} setFilter={setFilter} />
        <ColHead
          fieldName={tFields.category1.name}
          setFilter={setFilter}
        />
        <ColHead
          fieldName={tFields.category2.name}
          setFilter={setFilter}
        />
        <ColHead fieldName={tFields.type.name} setFilter={setFilter} />
        <ColHead fieldName={tFields.omit.name} setFilter={setFilter} />
      </tr>
    </thead>
  )
}

export default TableHead
