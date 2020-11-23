

```js
<App />
  activeTransactionId
  status
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
          _handleCancelClick
          <Criteria />
          <Actions />

```