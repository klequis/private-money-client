/* ----- 
   WORDS 
   ----- */
// A
export const wdAcctId = 'acctId'
export const wdActionType = 'actionType'
export const wdActions = 'actions'
export const wdActive = 'active'
export const wdActiveId = 'activeId'
export const wdAmount = 'amount'
export const wdAsc = 'asc'
// B
export const wdBeginsWith = 'beginsWith'
export const wdBoth = 'both'
// C
export const wdCategorize = 'categorize'
export const wdCategorizeAction = 'categorizeAction'
export const wdCategory1 = 'category1'
export const wdCategory2 = 'category2'
export const wdChecked = 'checked'
export const wdCheckNumber = 'checkNumber'
export const wdContains = 'contains'
export const wdCreate = 'create'
export const wdCriteria = 'criteria'
export const wdCriteriaResults = 'criteriaResults'
export const wdCheckbox = 'checkbox'
export const wdCheckboxShowOmitted = 'checkboxShowOmitted'
export const wdCriteriaResultsFetchStatus = 'criteriaResultsFetchStatus'
export const wdCriteriaResultsFetchError = 'criteriaResultsFetchError'
// D
export const wdData = 'data'
export const wdDate = 'date'
export const wdDesc = 'desc'
export const wdDescription = 'description'
export const wdDisabled = 'disabled'
export const wdDoesNotContain = 'doesNotContain'
export const wdDuplicate = 'duplicate'
export const wdDuplicateStatus = 'duplicateStatus'
// E
export const wdError = 'error'
export const wdEquals = 'equals'
export const wdExpense = 'expense'
// F
export const wdFetch = 'fetch'
export const wdField = 'field'
export const wdFieldName = 'fieldName'
export const wdFilters = 'filters'
export const wdFindValue = 'findValue'
// H
export const wdHasCategory = 'hasCategory'
export const wdHasActionTypeOmit = 'hasActionTypeOmit'
export const wdHasRule = 'hasRule'
// I
export const wdId = '_id'
export const wdIncome = 'income'
export const wdIsDirty = 'isDirty'
export const wdIsTmpRule = 'isTmpRule'
export const wdItems = 'items'
// M
export const wdMessage = 'message'
// N
export const wdNoCategory = 'noCategory'
export const wdNone = 'none'
export const wdNoRule = 'noRule'
export const wdNumAdditionalChars = 'numAdditionalChars'

// O
export const wdOmit = 'omit'
// export const wdOn = 'on'
export const wdOperator = 'operator'
export const wdOrigDescription = 'origDescription'
// P
export const wdPayload = 'payload'
// R
export const wdRadioHasCategory = 'radioHasCategory'
export const wdRadioHasRule = 'radioHasRule'
export const wdRadioShowIncomeExpense = 'radioShowIncomeExpense'
export const wdRequestStatusFetch = 'request-fetch'
export const wdRequestStatusPending = 'request-pending'
export const wdRequestStatusFulfilled = 'request-filfilled'
export const wdRequestStatusError = 'request-error'
export const wdRule = 'rule'
export const wdRuleId = 'ruleId'
export const wdRuleIds = 'ruleIds'
export const wdRules = 'rules'
export const wdRuleEdit = 'ruleEdit'
export const wdRenameAction = 'renameAction'
export const wdRulesCreateStatus = 'rulesCreateStatus'
export const wdRulesCreateError = 'rulesCreateError'
export const wdRulesFetchStatus = 'rulesFetchStatus'
export const wdRulesFetchError = 'rulesFetchError'
export const wdRulesUpdateStatus = 'rulesUpdateStatus'
export const wdRulesUpdateError = 'rulesUpdateError'
export const wdReplaceAll = 'replaceAll'
export const wdReplaceWithValue = 'replaceWithValue'
// S
export const wdShowExpenseOnly = 'showExpenseOnly'
export const wdShowIncomeOnly = 'showIncomeOnly'
export const wdSort = 'sort'
export const wdSortOrder = 'sortOrder'
export const wdStatus = 'status'
export const wdStrip = 'strip'

// T
export const wdTaxDeduct = 'taxDeduct'
export const wdType = 'type'
export const wdTx = 'tx'
export const wdTxFetchStatus = 'txFetchStatus'
export const wdTxFetchError = 'txFetchError'
export const wdTxTbl = 'txTbl'
// U
export const wdUpdate = 'update'
// V
export const wdValue = 'value'

/* ----- 
   PATHS 
   ----- */

// criteriaResults
export const pathCriteriaResults = [wdCriteriaResults]
export const pathCriteriaResultsFetchError = [
  wdCriteriaResults,
  wdFetch,
  wdError
]
export const pathCriteriaResultsFetchStatus = [
  wdCriteriaResults,
  wdFetch,
  wdStatus
]
export const pathCriteriaResultsItems = [wdCriteriaResults, wdItems]

// rules.ruleEdit
export const pathRuleEdit = [wdRules, wdRuleEdit]
export const pathRuleEditActions = [wdRules, wdRuleEdit, wdActions]
export const pathRuleEditCritera = [wdRules, wdRuleEdit, wdCriteria]
export const pathRuleEditHasActionTypeOmit = [
  wdRules,
  wdRuleEdit,
  wdHasActionTypeOmit
]
export const pathRuleEditId = [wdRules, wdRuleEdit, wdId]
export const pathRuleEditIsDirty = [wdRules, wdRuleEdit, wdIsDirty]
export const pathRuleEditIsTmpRule = [wdRules, wdRuleEdit, wdIsTmpRule]

// rules
export const pathRules = [wdRules]
export const pathRulesCreateError = [wdRules, wdCreate, wdError]
export const pathRulesCreateStatus = [wdRules, wdCreate, wdStatus]
export const pathRulesFetchError = [wdRules, wdFetch, wdError]
export const pathRulesFetchStatus = [wdRules, wdFetch, wdStatus]
export const pathRulesItems = [wdRules, wdItems]
export const pathRulesUpdateError = [wdRules, wdUpdate, wdError]
export const pathRulesUpdateStatus = [wdRules, wdUpdate, wdStatus]

// tx
export const pathTxActiveId = [wdTx, wdActiveId]
export const pathTxFetchError = [wdTx, wdFetch, wdError]
export const pathTxFetchStatus = [wdTx, wdFetch, wdStatus]
export const pathTxItems = [wdTx, wdItems]

// txTbl
export const pathTxTblmlters = [wdTxTbl, wdFilters]
// export const pathTxTblFiltersAcctId = [wdTxTbl, wdFilters, wdAcctId]
// export const pathTxTblFiltersCategory1 = [wdTxTbl, wdFilters, wdCategory1]
// export const pathTxTblFiltersCategory2 = [wdTxTbl, wdFilters, wdCategory2]
// export const pathTxTblFiltersDate = [wdTxTbl, wdFilters, wdDate]
// export const pathTxTblFiltersDescription = [wdTxTbl, wdFilters, wdDescription]
// export const pathTxTblFiltersType = [wdTxTbl, wdFilters, wdType]
export const pathTxTblFilterProps = {
  acctId: [wdTxTbl, wdFilters, wdAcctId],
  amount: [wdTxTbl, wdFilters, wdAmount],
  category1: [wdTxTbl, wdFilters, wdCategory1],
  category2: [wdTxTbl, wdFilters, wdCategory2],
  date: [wdTxTbl, wdFilters, wdDate],
  description: [wdTxTbl, wdFilters, wdDescription],
  type: [wdTxTbl, wdFilters, wdType]
}
export const pathTxTblFilters = [wdTxTbl, wdFilters]
export const pathTxTblRadioHasCategoryDisabled = [
  wdTxTbl,
  wdHasCategory,
  wdDisabled
]
export const pathTxTblRadioHasCategoryValue = [
  wdTxTbl,
  wdRadioHasCategory,
  wdValue
]
export const pathTxTblRadioHasRuleValue = [wdTxTbl, wdRadioHasRule, wdValue]
export const pathTxTblCheckBoxShowOmitted = [
  wdTxTbl,
  wdCheckboxShowOmitted,
  wdChecked
]
export const pathTxTblSort = [wdTxTbl, wdSort]
export const pathTxTblSortFieldName = [wdTxTbl, wdSort, wdFieldName]
export const pathTxTblSortOrder = [wdTxTbl, wdSort, wdSortOrder]
export const pathRadioShowIncomeExpenseValue = [
  wdTxTbl,
  wdRadioShowIncomeExpense,
  wdValue
]
