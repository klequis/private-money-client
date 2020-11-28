import { requestStatusNames } from 'globalConstants'
import * as R from 'ramda'

const {
  transactionsFetchStatus,
  rulesFetchStatus,
  ruleCreateStatus,
  ruleUpdateStatus
} = requestStatusNames

const actions = 'actions'
const activeTransactionId = 'activeTransactionId'
const categorizeRadio = 'categorizeRadio'
const checked = 'checked'
const criteria = 'criteria'
const criteriaResults = 'criteriaResults'
const dirty = 'dirty'
const disabled = 'disabled'
const error = 'error'
const hasRules = 'hasRules'
const isTmpRule = 'isTmpRule'
const isUncategorized = 'isUncategorized'
const items = 'items'
const options = 'options'
const rules = 'rules'
const ruleEdit = 'ruleEdit'
const ruleRadio = 'ruleRadio'
const transactions = 'transactions'
const transactionsUi = 'transactionsUi'
const value = 'value'

export const selectorPaths = {
  activeTransactionId: [transactions, activeTransactionId],
  categorizeRadioDisabled: [categorizeRadio, disabled],
  categorizeRadioValue: [categorizeRadio, value],
  criteriaResultsItems: [criteriaResults, items],
  optionsCategorizeRadioValue: [options, categorizeRadio, value],
  optionsRuleRadioValue: [options, ruleRadio, value],
  ruleEdit: [rules, ruleEdit],
  // ruleEditRule: [rules, ruleEdit],
  
  transactionsError: [transactions, error],
  transactionsFetchStatus: [transactions, transactionsFetchStatus],
  transactionsItems: [transactions, items],
  transactionsUiHasRulesChecked: [transactionsUi, hasRules, checked],
  transactionsUiOptions: [transactionsUi, options],
  transactionsUiIsUncategorizedChecked: [
    transactionsUi,
    isUncategorized,
    checked
  ]
}

// export const selectorPaths. = {
//   activeTransactionId: R.tail(selectorPaths.activeTransactionId),
//   categorizeRadioDisabled: R.tail(selectorPaths.categorizeRadioDisabled),
//   categorizeRadioValue: R.tail(selectorPaths.categorizeRadioValue),
//   criteriaResultsItems: R.tail(selectorPaths.criteriaResultsItems),
//   optionsCategorizeRadioValue: R.tail(selectorPaths.optionsCategorizeRadioValue),
//   optionsRuleRadioValue: R.tail(selectorPaths.optionsRuleRadioValue),
//   ruleEdit: R.tail(selectorPaths.ruleEdit),
//   // ruleEditRule: [rules, ruleEdit],
//   ruleEditActions: R.tail(selectorPaths.ruleEditActions),
//   ruleEditCriteria: R.tail(selectorPaths.ruleEditCriteria),
//   ruleEditDirty: R.tail(selectorPaths.ruleEditDirty),
//   ruleEditIsTmpRule: R.tail(selectorPaths.ruleEditIsTmpRule),
//   ruleCreateStatus: R.tail(selectorPaths.ruleCreateStatus),
//   ruleRadioValue: R.tail(selectorPaths.ruleRadioValue),
//   ruleUpdateStatus: R.tail(selectorPaths.ruleUpdateStatus),
//   rulesFetchStatus: R.tail(selectorPaths.rulesFetchStatus),
//   rulesItems: R.tail(selectorPaths.rulesItems),
//   transactionsError: R.tail(selectorPaths.transactionsError),
//   transactionsFetchStatus: R.tail(selectorPaths.transactionsFetchStatus),
//   transactionsItems: R.tail(selectorPaths.transactionsItems),
//   transactionsUiHasRulesChecked: R.tail(selectorPaths.transactionsUiHasRulesChecked),
//   transactionsUiOptions: R.tail(selectorPaths.transactionsUiOptions),
//   transactionsUiIsUncategorizedChecked: R.tail(selectorPaths.transactionsUiIsUncategorizedChecked),
// }
