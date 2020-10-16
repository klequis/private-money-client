import React from 'react'
import AllDataColHead from './AllDataColHead'
import { transactionFields as fields } from 'fields/transactionFields'

const TableHead = ({ setFilter }) => {
  return (
    <thead>
      <tr>
        <AllDataColHead fieldName={fields.date.name} setFilter={setFilter} />
        <AllDataColHead fieldName={fields.acctId.name} setFilter={setFilter} />
        <AllDataColHead
          fieldName={fields.description.name}
          setFilter={setFilter}
        />
        <AllDataColHead fieldName={fields.amount.name} setFilter={setFilter} />
        <AllDataColHead
          fieldName={fields.category1.name}
          setFilter={setFilter}
        />
        <AllDataColHead
          fieldName={fields.category2.name}
          setFilter={setFilter}
        />
        <AllDataColHead fieldName={fields.type.name} setFilter={setFilter} />
        <AllDataColHead fieldName={fields.omit.name} setFilter={setFilter} />
      </tr>
    </thead>
  )
}

export default TableHead
