export const wdAcctId =	'acctId'
export const wdActions =	'actions'
export const wdActiveId =	'activeId'
export const wdCategorizeAction =	'categorizeAction'
export const wdCategory1 =	'category1'
export const wdCategory2 =	'category2'
export const wdCreate =	'create'
export const wdCriteria =	'criteria'
export const wdCriteriaResults =	'criteriaResults'
export const wdDate =	'date'
export const wdDisabled =	'disabled'
export const wdError =	'error'
export const wdDescription =	'description'
export const wdFetch =	'fetch'
export const wdFilters = 'filters'
export const wdId =	'_id'
export const wdIsDirty =	'isDirty'
export const wdItems =	'items'
export const wdRadioCategorized =	'radioCategorized'
export const wdRadioHasRule =	'radioHasRule'
export const wdRenameAction =	'renameAction'
export const wdRequestStatusPending = 'request-pending'
export const wdRequestStatusFulfilled = 'request-filfilled'
export const wdRequestStatusError = 'request-error'
export const wdRules = 'rules'
export const wdRuleEdit =	'ruleEdit'
export const wdStatus =	'status'
export const wdType =	'type'
export const wdTx =	'tx'
export const wdUpdate =	'update'
export const wdValue =	'value'

// rules
export const pathRulesCreateError = [wdRules, wdCreate, wdError]
export const pathRulesCreateStatus = [wdRules, wdCreate, wdStatus]
export const pathRulesUpdateError = [wdRules, wdUpdate, wdError]
export const pathRulesUpdateStatus = [wdRules, wdUpdate, wdStatus]

export const pathRuleEditActions = [wdRules, wdRuleEdit, wdActions]
// export const pathRuleEditActionsCategorize = [wdRules, wdRuleEdit, wd] is a pseudo path
// export const pathRuleEditActionsRename = [wdRules, wdRuleEdit,]  is a pseudo path
export const pathRuleEditCritera = [wdRules, wdRuleEdit, wdCriteria]
export const pathRuleEditId = [wdRules, wdRuleEdit, wdId]
export const pathRuleEditIsDirty = [wdRules, wdRuleEdit, wdIsDirty]

export const pathRulesFetchError = [wdRules, wdFetch, wdError]
export const pathRulesFetchStatus = [wdRules, wdFetch, wdError]
export const pathRulesItems = [wdRules, wdItems]

export const pathRuleUpdateError = [wdRules, wdUpdate, wdError]
export const pathRuleUpdateStatus = [wdRules, wdUpdate, wdError]


// criteriaResults
export const pathCriteriaResultsFetchError = [wdCriteriaResults, wdFetch, wdError]
export const pathCriteriaResultsFetchStatus = [wdCriteriaResults, wdFetch, wdError]
export const pathCriteriaResultsItems = [wdCriteriaResults, wdItems]


// tx
export const pathTxActiveId = [wdTx, wdActiveId]
export const pathTxFetchError = [wdTx, wdFetch, wdError]
export const pathTxFetchStatus = [wdTx, wdFetch, wdError]
export const pathTxItems = [wdTx, wdItems]
export const pathTxTblFiltersAcctId = [wdTx, wdFilters, wdAcctId]
export const pathTxTblFiltersCategory1 = [wdTx, wdFilters, wdCategory1]
export const pathTxTblFiltersCategory2 = [wdTx, wdFilters, wdCategory2]
export const pathTxTblFiltersDate = [wdTx, wdFilters, wdDate]
export const pathTxTblFiltersDescription = [wdTx, wdFilters, wdDescription]
export const pathTxTblFiltersType = [wdTx, wdFilters, wdType]
export const pathTxTblRadioCategorizedDisabled = [wdTx, wdRadioCategorized, wdDisabled]
export const pathTxTblRadioCategorizedValue = [wdTx, wdRadioCategorized, wdValue]
export const pathTxTblRadioHasRuleValue = [wdTx, wdRadioHasRule, wdValue]
