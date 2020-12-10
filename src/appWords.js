/* WORDS */
export const wdAcctId =	'acctId'
export const wdActionType = 'actionType'
export const wdActions =	'actions'
export const wdActiveId =	'activeId'
export const wdAll = 'all'
export const wdAmount = 'amount'
export const wdBoth = 'both'
export const wdCategorized = 'categorized'
export const wdCategorizeAction =	'categorizeAction'
export const wdCategory1 =	'category1'
export const wdCategory2 =	'category2'
export const wdCreate =	'create'
export const wdCriteria =	'criteria'
export const wdCriteriaResults =	'criteriaResults'
export const wdDate =	'date'
export const wdDescription =	'description'
export const wdDisabled =	'disabled'
export const wdDoesNotHaveRule = 'doesNotHaveRule'
export const wdError =	'error'
export const wdFetch =	'fetch'
export const wdFilters = 'filters'
export const wdHasActionTypeOmit = 'hasActionTypeOmit'
export const wdHasRule = 'hasRule'
export const wdId =	'_id'
export const wdIsDirty =	'isDirty'
export const wdIsTmpRule = 'wdIsTmpRule'
export const wdItems =	'items'
export const wdOmit = 'omit'
export const wdRadioCategorized =	'radioCategorized'
export const wdRadioHasRule =	'radioHasRule'
export const wdRenameAction =	'renameAction'
export const wdRequestStatusFetch = 'request-fetch'
export const wdRequestStatusPending = 'request-pending'
export const wdRequestStatusFulfilled = 'request-filfilled'
export const wdRequestStatusError = 'request-error'
export const wdRules = 'rules'
export const wdRuleEdit =	'ruleEdit'
export const wdStatus =	'status'
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
export const pathTxTblFilters = [wdTxTbl, wdFilters]
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
export const pathTxTblRadioCategorizedDisabled = [wdTxTbl, wdRadioCategorized, wdDisabled]
export const pathTxTblRadioCategorizedValue = [wdTxTbl, wdRadioCategorized, wdValue]
export const pathTxTblRadioHasRuleValue = [wdTxTbl, wdRadioHasRule, wdValue]

