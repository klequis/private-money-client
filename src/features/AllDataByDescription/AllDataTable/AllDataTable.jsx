import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import isNilOrEmpty from 'lib/isNilOrEmpty'
import { selectAllTransactions } from 'features/transactions/transactionsSlice'
import * as R from 'ramda'
import Table from 'components/Table'
import AllDataTableBody from './AllDataTableBody'
import AllDataTableHead from './AllDataTableHead'

const AllDataTable = () => {
  const [_filter, _setFilter] = useState({
    field: '',
    value: '',
    active: false
  })

  // const transactions = useSelector((state) => state.transactions.items)
  const transactions = useSelector(selectAllTransactions)

  const sortCompare = (a, b) => {
    if (a.description < b.description) {
      return -1
    } else if (a < b) {
      return 1
    }
    return 0
  }
  const sortByDescription = (data) => {
    return data.sort((a, b) => sortCompare(a, b))
  }

  // ORIGINAL
  // const filteredData = () => {
  //   return _filter.active
  //     ? transactions.filter(
  //         // (t) => t[_filter.field].toLowerCase() === _filter.value.toLowerCase()
  //         (t) =>
  //           t[_filter.field].toLowerCase().includes(_filter.value.toLowerCase())
  //       )
  //     : transactions
  // }

  // HARD CODED SORT. DELETE THESE FUNCTIONS


  const filteredData = () => {
    const sorted = R.sortBy(R.prop('origDescription'))(transactions)

    return sorted
  }

  const setFilter = (field, value) => {
    isNilOrEmpty(field) || isNilOrEmpty(value)
      ? _setFilter({ field: '', value: '', active: false })
      : _setFilter({ field: field, value: value, active: true })
  }

  return (
    <Table>
      <AllDataTableHead setFilter={setFilter} />
      {/* TODO: tmp code. Sort is hard coded */}
      {filteredData().map((t) => (
        <AllDataTableBody key={t._id} transactionId={t._id} />
      ))}
    </Table>
  )
}

export default AllDataTable

/*
return (
    <BSTable size="sm" variant="dark" hover>
      <TableHead setFilter={setFilter} />
      {filteredData().map((t) => (
        <TableBody key={t._id} transactionId={t._id} />
      ))}
    </BSTable>
  )
*/