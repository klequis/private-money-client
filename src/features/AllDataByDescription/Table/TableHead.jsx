import React from 'react'
import ColumnHeading from './ColumnHeading'
import { transactionFields as fields } from 'globalConstants'

const TableHead = ({ setFilter }) => {
  return (
    <thead>
      <tr>
        <ColumnHeading fieldName={fields.date.name} setFilter={setFilter} />
        <ColumnHeading fieldName={fields.acctId.name} setFilter={setFilter} />
        <ColumnHeading
          fieldName={fields.description.name}
          setFilter={setFilter}
        />
        <ColumnHeading fieldName={fields.credit.name} setFilter={setFilter} />
        <ColumnHeading fieldName={fields.debit.name} setFilter={setFilter} />
        <ColumnHeading
          fieldName={fields.category1.name}
          setFilter={setFilter}
        />
        <ColumnHeading
          fieldName={fields.category2.name}
          setFilter={setFilter}
        />
        <ColumnHeading fieldName={fields.type.name} setFilter={setFilter} />
        <ColumnHeading fieldName={fields.omit.name} setFilter={setFilter} />
      </tr>
    </thead>
  )
}

export default TableHead
