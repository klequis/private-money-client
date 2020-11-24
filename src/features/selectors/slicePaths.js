import { ruleCreate } from 'features/rules'
import { requestStatusNames } from 'globalConstants'

const { transactionsFetchStatus, rulesFetchStatus, ruleCreateStatus, ruleUpdateStatus } = requestStatusNames

const actions = 'actions'
const activeTransactionId = 'activeTransactionId'
const criteria = 'criteria'
const criteriaResults = 'criteriaResults'
const error = 'error'
const items = 'items'
const rules = 'rules'
const ruleEdit = 'ruleEdit'
const transactions = 'transactions'

export const slicePaths = {
  activeTransactionId: [transactions, activeTransactionId],
  criteriaResultsItems: [criteriaResults, items],
  ruleEditActions: [ruleEdit, actions],
  ruleEditCriteria: [ruleEdit, criteria],
  ruleCreateStatus: [ruleEdit, ruleCreateStatus],
  ruleUpdateStatus: [ruleEdit, ruleUpdateStatus],
  rulesFetchStatus: [rules, rulesFetchStatus],
  transactionsError: [transactions, error],
  transactionsFetchStatus: [transactions, transactionsFetchStatus],
  transactionsItems: [transactions, items],
}
