import * as R from 'ramda'
import {
  selectTxTblSortFieldName,
  selectTxTblSortOrder
} from './txTblSelectors'
import { isNilOrEmpty } from 'lib/isNilOrEmpty'
import { dataTypes } from 'lib/dataTypes'
import { txFields } from 'features/tx'
import { wdAsc } from 'appWords'

const _makeDate = R.curry((value) => new Date(value))

export const sortTxs = R.curry((state, txItems) => {
  const sortField = selectTxTblSortFieldName(state)
  const sortOrder = selectTxTblSortOrder(state)
  if (isNilOrEmpty(sortField) || isNilOrEmpty(sortOrder)) {
    return txItems
  }
  const sortFieldDataType = txFields[sortField].dataType
  if (sortFieldDataType === dataTypes.String) {
    const valueFn = R.compose(R.toLower, R.prop(sortField))
    return sortOrder === wdAsc
      ? R.sort(R.ascend(valueFn))(txItems)
      : R.sort(R.descend(valueFn))(txItems)
  } else if (sortFieldDataType === dataTypes.Number) {
    const scoreToNum = R.compose(Number, R.prop(sortField))
    return sortOrder === wdAsc
      ? R.sortWith([R.ascend(scoreToNum)])(txItems)
      : R.sortWith([R.descend(scoreToNum)])(txItems)
  } else if (sortFieldDataType === dataTypes.Date) {
    const stringToDate = R.compose(_makeDate, R.prop(sortField))
    return sortOrder === wdAsc
      ? R.sortWith([R.ascend(stringToDate)])(txItems)
      : R.sortWith([R.descend(stringToDate)])(txItems)
  } else if (sortFieldDataType === dataTypes.Boolean) {
    return sortOrder === wdAsc
      ? R.sort(R.ascend(R.prop(sortField)))(txItems)
      : R.sort(R.ascend(R.prop(sortField)))(txItems)
  } else {
    throw new Error('txTblSelectors.sortTx - unknown dataType')
  }
})
