

```js
<App />
  activeTransactionId
  status
  useEffect()
    if ( refresh ) {
      transactionsFetch()
      fulesFetch()
    }
  useRuleEditSet(activeTransactionId)
  !isNilOrEmpty(transaction)
    hasRule 
      ? ruleSetExistingRule 
      : ruleEditSetNewRule
  isNilOrEmpty(activeTransactionId)
    ? <Transactions />
    :  <RuleCreate />
        <Rule />
          _handleSaveClick
            setRulesRefresh()
            setTransactionsRefresh()
          _handleCancelClick
          <Criteria />
          <Actions />

```

**transactionsSlice**

```js

state.transactionsFetchStatus: value
  setTransactionsRefresh(state) {
    state.transactionsFetchStatus = requestStatusStates.refresh
  }
```