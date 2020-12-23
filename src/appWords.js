/* WORDS */
export const wdAcctId =	'acctId'
export const wdActionType = 'actionType'
export const wdActions =	'actions'
export const wdActive = 'active'
export const wdActiveId =	'activeId'
export const wdAll = 'all'
export const wdAmount = 'amount'
export const wdBeginsWith = 'beginsWith'
export const wdBoth = 'both'
export const wdCategorize = 'categorize'
export const wdCategorized = 'categorized'
export const wdCategorizeAction =	'categorizeAction'
export const wdCategory1 =	'category1'
export const wdCategory2 =	'category2'
export const wdChecked = 'checked'
export const wdCheckNumber = 'checkNumber'
export const wdContains = 'contains'
export const wdCreate =	'create'
export const wdCriteria =	'criteria'
export const wdCriteriaResults =	'criteriaResults'
export const wdData = 'data'
export const wdDate =	'date'
export const wdDescription =	'description'
export const wdDisabled =	'disabled'
export const wdDoesNotContain = 'doesNotContain'
export const wdDoesNotHaveRule = 'doesNotHaveRule'
export const wdDuplicate = 'duplicate'
export const wdDuplicateStatus = 'duplicateStatus'
export const wdError =	'error'
export const wdEquals = 'equals'
export const wdFetch =	'fetch'
export const wdFilters = 'filters'
export const wdHasActionTypeOmit = 'hasActionTypeOmit'
export const wdHasRule = 'hasRule'
export const wdId =	'_id'
export const wdIsDirty =	'isDirty'
export const wdIsTmpRule = 'isTmpRule'
export const wdItems =	'items'
export const wdOmit = 'omit'
export const wdOrigDescription = 'origDescription'
export const wdRadioCategorized =	'radioCategorized'
export const wdRadioHasRule =	'radioHasRule'
export const wdRenameAction =	'renameAction'
export const wdRequestStatusFetch = 'request-fetch'
export const wdRequestStatusPending = 'request-pending'
export const wdRequestStatusFulfilled = 'request-filfilled'
export const wdRequestStatusError = 'request-error'
export const wdRule = 'rule'
export const wdRuleId = 'ruleId'
export const wdRuleIds = 'ruleIds'
export const wdRules = 'rules'
export const wdRuleEdit =	'ruleEdit'
export const wdCheckbox = 'checkbox'
export const wdCheckboxShowOmitted = 'checkboxShowOmitted'
export const wdSort = 'sort'
export const wdAsc = 'asc'
export const wdDesc = 'desc'
export const wdNone = 'none'
export const wdMessage = 'message'
export const wdField = 'field'
export const wdFieldName = 'fieldName'
export const wdPayload = 'payload'
export const wdSortOrder = 'sortOrder'
export const wdStatus =	'status'
export const wdTaxDeduct = 'taxDeduct'
export const wdType =	'type'
export const wdTx =	'tx'
export const wdUncategorized = 'uncategorized'
export const wdUpdate =	'update'
export const wdValue =	'value'

export const wdTxFetchStatus = 'txFetchStatus'
export const wdTxFetchError = 'txFetchError'

export const wdRulesCreateStatus = 'rulesCreateStatus'
export const wdRulesCreateError = 'rulesCreateError'

export const wdRulesFetchStatus = 'rulesFetchStatus'
export const wdRulesFetchError = 'rulesFetchError'

export const wdRulesUpdateStatus = 'rulesUpdateStatus'
export const wdRulesUpdateError = 'rulesUpdateError'

export const wdCriteriaResultsFetchStatus = 'criteriaResultsFetchStatus'
export const wdCriteriaResultsFetchError = 'criteriaResultsFetchError'

export const wdTxTbl = 'txTbl'

export const wdReplaceAll = 'replaceAll'
export const wdStrip = 'strip'
export const wdFindValue = 'findValue'
export const wdNumAdditionalChars = 'numAdditionalChars'
export const wdReplaceWithValue = 'replaceWithValue'
export const wdOperator = 'operator'
export const wdOperation = 'operation'
/* PATHS */

// criteriaResults
export const pathCriteriaResults = [wdCriteriaResults]
export const pathCriteriaResultsFetchError = [wdCriteriaResults, wdFetch, wdError]
export const pathCriteriaResultsFetchStatus = [wdCriteriaResults, wdFetch, wdStatus]
export const pathCriteriaResultsItems = [wdCriteriaResults, wdItems]


// rules.ruleEdit
export const pathRuleEdit = [wdRules, wdRuleEdit]
export const pathRuleEditActions = [wdRules, wdRuleEdit, wdActions]
export const pathRuleEditCritera = [wdRules, wdRuleEdit, wdCriteria]
export const pathRuleEditHasActionTypeOmit = [wdRules, wdRuleEdit, wdHasActionTypeOmit]
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
             

export const pathTxTblRadioCategorizedDisabled = [wdTxTbl, wdRadioCategorized, wdDisabled]
export const pathTxTblRadioCategorizedValue = [wdTxTbl, wdRadioCategorized, wdValue]
export const pathTxTblRadioHasRuleValue = [wdTxTbl, wdRadioHasRule, wdValue]
export const pathTxTblCheckBoxShowOmitted = [wdTxTbl, wdCheckboxShowOmitted, wdChecked]
export const pathTxTblSort = [wdTxTbl, wdSort]
export const pathTxTblSortFieldName = [wdTxTbl, wdSort, wdFieldName]
export const pathTxTblSortOrder = [wdTxTbl, wdSort, wdSortOrder]


