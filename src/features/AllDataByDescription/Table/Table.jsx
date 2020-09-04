import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import TableBody from './TableBody.jsx'
import BSTable from 'react-bootstrap/Table'
import TableHead from './TableHead'
import isNilOrEmpty from 'lib/isNilOrEmpty'
import { selectAllTransactions } from 'features/transactions/transactionsSlice'

const Table = () => {
  const [_filter, _setFilter] = useState({
    field: '',
    value: '',
    active: false
  })

  // const transactions = useSelector((state) => state.transactions.items)
  const transactions = useSelector(selectAllTransactions)

  const filteredData = () => {
    return _filter.active
      ? transactions.filter(
          // (t) => t[_filter.field].toLowerCase() === _filter.value.toLowerCase()
          (t) =>
            t[_filter.field].toLowerCase().includes(_filter.value.toLowerCase())
        )
      : transactions
  }

  const setFilter = (field, value) => {
    isNilOrEmpty(field) || isNilOrEmpty(value)
      ? _setFilter({ field: '', value: '', active: false })
      : _setFilter({ field: field, value: value, active: true })
  }

  return (
    <BSTable size="sm" variant="dark" hover>
      <TableHead setFilter={setFilter} />
      {filteredData().map((t) => (
        <TableBody key={t._id} transactionId={t._id} />
      ))}
    </BSTable>
  )
}

export default Table
