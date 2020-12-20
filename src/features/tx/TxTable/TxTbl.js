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
  // green('filteredTx', filteredTx)

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
          <TxTblBody key={t._id} txId={t._id} />
        ))}
      </BaseTable>
    </>
    
  )
}

