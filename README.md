# Paths

- removed 'options'

transactions.activeTransactionId // wdTransactionsActiveId
            .error // wdTransactionsFetchError
            .items // wdTransactionsItems
            .transactionsFetchStatus // wdTransactionsFetchStatus
rules.items
     .rulesFetchStatus // wdRulesFetchStatus
     .ruleCreateStatus // wdRuleCreateStatus
     .ruleUpdateStatus // wdRuleUpdateStatus
     .ruleFetchError // wdRuleFetchError
     .ruleCreateError // wdRuleCreateError
     .ruleUpdateError // wdRuleUpdateError
     .ruleEdit._id  // wdRuleEditId
              .isDirty // wdRuleEditIsDirty
              .isTmpRule // wdRuleEditIsTmpRule
              .criteria // wdRuleEditCriteria
              .actions // wdRuleEditActions
criteriaResults.items // wdCriteriaResultsItems
               .criteriaResultsFetchStatus // wdCriteriaResultsFetchStatus
               .criteriaResultsFetchError // wdCriteriaResultsFetchError
transactionsUi.ruleRadio.value
               .categorizeRadio.value
                               .disabled
              .filters.acctId
                      .amount
                      .category1
                      .category2
                      .date
                      .description
                      .type


## New

### Repaces transactionsUi

transactionsTable.hasRuleRadio.Value: wdAll || wdHasRule || wdDoesNotHaveRule // wdTransactionsTableHasRuleRadioValue
transTbl.hasRuleRadio.Value: wdAll || wdHasRule || wdDoesNotHaveRule // wdTransTblHasRuleRadioValue
txTbl.hasRuleRadio.Value: wdAll || wdHasRule || wdDoesNotHaveRule // wdTxTblHasRuleRadioValue

                 .hasCategoryRadio.value: wdBoth || wdCategorized || wdUncategorized

                 .filters.acctId
                         .amount
                         .category1
                         .category2
                         .date
                         .description
                         .type