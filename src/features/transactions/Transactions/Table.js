import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import isNilOrEmpty from 'lib/isNilOrEmpty'
import { selectAllTransactions } from 'features/transactions'
import * as R from 'ramda'
import BaseTable from 'components/Table'
import TableBody from './TableBody'
import TableHead from './TableHead'

export const Table = () => {
  const [/*_filter,*/ _setFilter] = useState({
    field: '',
    value: '',
    active: false
  })

  // const transactions = useSelector((state) => state.transactions.items)
  const transactions = useSelector(selectAllTransactions)

  // const sortCompare = (a, b) => {
  //   if (a.description < b.description) {
  //     return -1
  //   } else if (a < b) {
  //     return 1
  //   }
  //   return 0
  // }
  /*
  const sortByDescription = (data) => {
    return data.sort((a, b) => sortCompare(a, b))
  }
  // */

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
  // HARD CODED SORT. DELETE THESE FUNCTIONS

  return (
    <BaseTable>
      <TableHead setFilter={setFilter} />
      {/* TODO: tmp code. Sort is hard coded */}
      {filteredData().map((t) => (
        <TableBody key={t._id} transactionId={t._id} />
      ))}
    </BaseTable>
  )
}


