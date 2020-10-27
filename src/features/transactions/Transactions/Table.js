import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { isNilOrEmpty } from 'lib/isNilOrEmpty'
import { selectAllTransactions } from 'features/transactions'
import { selectHasRulesChecked, selectIsUncategorizedChecked } from 'features/uiSettings/transactionsUi'
import * as R from 'ramda'
import BaseTable from 'components/Table'
import TableBody from './TableBody'
import TableHead from './TableHead'
import { TableNav } from './TableNav'

// eslint-disable-next-line
import { purple, green } from 'logger'

export const Table = () => {
  purple('Table', 'START')
  const [/*_filter,*/ _setFilter] = useState({
    field: '',
    value: '',
    active: false
  })

  const [_filterNow, _setFilterNow] = useState(true)

  const transactions = useSelector(selectAllTransactions)

  const filterByHasRules = useSelector(selectHasRulesChecked)
  const filterByIsUncategorized = useSelector(selectIsUncategorizedChecked)

  green('Table: filterByHasRules', filterByHasRules)

  useEffect(() => {
    purple('TABLE', 'useEffect')
    if (filterByHasRules || filterByIsUncategorized) {
      _setFilterNow(true)
    }
  }, [filterByHasRules, _filterNow])



  // HARD CODED SORT. DELETE THESE FUNCTIONS

  // nothing without a rul can have a category, so filter by presence of rule first
  const filterTransactions = data => data.filter(t => !isNilOrEmpty(t.ruleIds))
  const filteredData = (transactions) => {
    const filtered = (filterByHasRules || filterByIsUncategorized)
      ? transactions.filter(t => {
        return filterByIsUncategorized
          ? (!isNilOrEmpty(t.ruleIds) && isNilOrEmpty(t.category1))
          : (!isNilOrEmpty(t.ruleIds))
      }
      )
      : transactions
    // sorted.filter(t => !isNilOrEmpty(t.category1)) : transactions
    const sorted = R.sortBy(R.prop('origDescription'))(filtered)

    // _setFilterNow(false)
    return sorted
  }

  const setFilter = (field, value) => {
    isNilOrEmpty(field) || isNilOrEmpty(value)
      ? _setFilter({ field: '', value: '', active: false })
      : _setFilter({ field: field, value: value, active: true })
  }
  // HARD CODED SORT. DELETE THESE FUNCTIONS

  return (
    <>
      <TableNav />
      <BaseTable>
        <TableHead setFilter={setFilter} />
        {/* TODO: tmp code. Sort is hard coded */}
        {/* {filteredData(transactions).map((t) => (
          <TableBody key={t._id} transactionId={t._id} />
        ))} */}
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