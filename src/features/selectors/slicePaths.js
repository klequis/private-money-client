import { requestStatusNames } from 'globalConstants'

const { transactionsFetchStatus, rulesFetchStatus, ruleCreateStatus, ruleUpdateStatus } = requestStatusNames

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
const rule = 'rule'
const rules = 'rules'
const ruleEdit = 'ruleEdit'
const ruleRadio = 'ruleRadio'
const transactions = 'transactions'
const transactionsUi = 'transactionsUi'
const value = 'value'

export const slicePaths = {
  activeTransactionId: [transactions, activeTransactionId],
  categorizeRadioDisabled: [categorizeRadio, disabled],
  categorizeRadioValue: [categorizeRadio, value],
  criteriaResultsItems: [criteriaResults, items],
  optionsCategorizeRadioValue: [options, categorizeRadio, value],
  optionsRuleRadioValue: [options, ruleRadio, value],
  ruleEdit: [rules, ruleEdit],
  ruleEditRule: [rules, ruleEdit, rule],
  ruleEditActions: [rules, ruleEdit, rule, actions],
  ruleEditCriteria: [rules, ruleEdit, rule, criteria],
  ruleEditDirty: [rules, ruleEdit, rule, dirty],
  ruleEditIsTmpRule: [rules, ruleEdit, isTmpRule],
  ruleCreateStatus: [rules, ruleCreateStatus],
  ruleRadioValue: [ruleRadio, value],
  ruleUpdateStatus: [rules, ruleUpdateStatus],
  rulesFetchStatus: [rules, rulesFetchStatus],
  rulesItems: [rules, items],
  transactionsError: [transactions, error],
  transactionsFetchStatus: [transactions, transactionsFetchStatus],
  transactionsItems: [transactions, items],
  transactionsUiHasRulesChecked: [transactionsUi, hasRules, checked],
  transactionsUiOptions: [transactionsUi, options],
  transactionsUiIsUncategorizedChecked: [transactionsUi, isUncategorized, checked]
}
