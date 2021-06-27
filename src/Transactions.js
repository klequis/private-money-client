import React from 'react'
import { useSelector } from 'react-redux'
import { RuleCreate } from 'features/rules'
import { TxTbl } from 'features/txTbl'
import { isNilOrEmpty } from 'lib/isNilOrEmpty'
import { selectActiveTxId } from 'features/selectors'
import { useRuleEditSet } from 'features/rules/useRuleEditSet'

export const Transactions = () => {
  const _activeTxId = useSelector(selectActiveTxId)
  useRuleEditSet(_activeTxId)
  return <> {isNilOrEmpty(_activeTxId) ? <TxTbl /> : <RuleCreate />}</>
}
