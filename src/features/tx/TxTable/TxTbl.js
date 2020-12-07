// TODO: re-enable Sort

import React , { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { isNilOrEmpty } from 'lib/isNilOrEmpty'


import { Table as BaseTable } from 'components/Table'
import { TxTblBody } from './TxTblBody'
import { TxTblHead } from './TxTblHead'
import { TxTblNav } from './TxTblNav'
// import { transactionOptionValues as optionValues } from 'globalConstants'
// import * as R from 'ramda'
import {
  selectFilteredTx
} from 'features/selectors'
import { useFilteredTx } from './useFilteredTx'

/* eslint-disable */
import { purple, green, red } from 'logger'
import { RenderCount } from 'components/RenderCount'
/* eslint-enable */

let countTotal = 0
let countReturn = 0

export const TxTbl = () => {
  countTotal = countTotal + 1
  // ColumnHeadFilters
  // const [/*_filter,*/ _setFilter] = useState({
  //   field: '',
  //   value: '',
  //   active: false
  // })

  const filteredTx = useSelector(selectFilteredTx)
  // const filteredTx = useFilteredTx()

  // red('filteredTransactions', filteredTransactions)
  // const transactions = useSelector(selectTxItems)

  // TODO this appears to be useless
  // if (isNilOrEmpty(filteredTransactions)) {
  //   // red('null', null)
  //   return null
  // }
  // green('filteredTx.length', filteredTx.length)
  countReturn = countReturn + 1
  return (
    <>
      <RenderCount
          componentName="TxTbl"
          countTotal={{ actual: countTotal, min: 8, max: 14 }}
          countReturn={{ actual: countReturn, min: 8, max: 10 }}
        />
        <h1>TxTbl</h1>
      <TxTblNav />
      <div>Number of rows: {filteredTx.length}</div>
      <BaseTable>
        <TxTblHead />
        {filteredTx.map((t) => (
          <TxTblBody key={t._id} transactionId={t._id} />
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
