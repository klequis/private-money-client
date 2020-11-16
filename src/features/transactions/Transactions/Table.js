// TODO: re-enable Sort

import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { isNilOrEmpty } from 'lib/isNilOrEmpty'
import { selectAllTransactions } from 'features/transactions'

import { Table as BaseTable } from 'components/Table'
import { TableBody } from './TableBody'
import { TableHead } from './TableHead'
import { TableNav } from './TableNav'
import { transactionOptionValues as optionValues } from 'globalConstants'
import * as R from 'ramda'
import { selectFilteredTransactions } from 'features/uiSettings/transactionsUiSlice'

// eslint-disable-next-line
import { purple, green } from 'logger'

export const Table = () => {
  // ColumnHeadFilters
  const [/*_filter,*/ _setFilter] = useState({
    field: '',
    value: '',
    active: false
  })

  const filteredTransactions = useSelector(selectFilteredTransactions)
  const transactions = useSelector(selectAllTransactions)
  if (isNilOrEmpty(transactions)) {
    return null
  }

  return (
    <>
      <TableNav />
      <BaseTable>
        <TableHead />
        {/* TODO: tmp code. Sort is hard coded */}
        {filteredTransactions.map((t) => (
          <TableBody key={t._id} transactionId={t._id} />
        ))}
      </BaseTable>
    </>
  )
}

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

/* **** wip 10/28/2020 ****

export const Table = () => {
  
  // ColumnHeadFilters
  const [_filter, _setFilter] = useState({
    field: '',
    value: '',
    active: false
  })

  // const [_filterNow, _setFilterNow] = useState(true)

  // const transactions = useSelector(selectAllTransactions)

  // const filterByHasRules = useSelector(selectHasRulesChecked)
  // const filterByIsUncategorized = useSelector(selectIsUncategorizedChecked)

  green('Table: filterByHasRules', filterByHasRules)

  // useEffect(() => {
  //   purple('TABLE', 'useEffect')
  //   if (filterByHasRules || filterByIsUncategorized) {
  //     _setFilterNow(true)
  //   }
  // }, [filterByHasRules, _filterNow])




  // const filterTransactions = data => data.filter(t => !isNilOrEmpty(t.ruleIds))

  // const filteredData = (transactions) => {
  //   const filtered = (filterByHasRules || filterByIsUncategorized)
  //     ? transactions.filter(t => {
  //       return filterByIsUncategorized
  //         ? (!isNilOrEmpty(t.ruleIds) && isNilOrEmpty(t.category1))
  //         : (!isNilOrEmpty(t.ruleIds))
  //     }
  //     )
  //     : transactions
  //   // sorted.filter(t => !isNilOrEmpty(t.category1)) : transactions
  //   const sorted = R.sortBy(R.prop('origDescription'))(filtered)

  //   // _setFilterNow(false)
  //   return sorted
  // }

  const setFilter = (field, value) => {
    isNilOrEmpty(field) || isNilOrEmpty(value)
      ? _setFilter({ field: '', value: '', active: false })
      : _setFilter({ field: field, value: value, active: true })
  }

  return (
    <>
      <TableNav optionState={_optionState} />
      <BaseTable>
        <TableHead setFilter={setFilter} />
        
        {filteredData(transactions).map((t) => (
          <TableBody key={t._id} transactionId={t._id} />
        ))}
      </BaseTable>
    </>
  )
}












  */
