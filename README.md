
```js
cosnt state = {
  transactions: {
    activeTransactionId: string, // mongodb _id
    criteriaResult: array, // of transaction objects
    error: any, // fetch error message
    items: array, // of all transactions
    transactionsFetchStatus: string
  },
  rules: {
    items: array, // of rule objects
    rulesFetchStatus: string,
    ruleCreateStatus: string,
    ruleUpdateStatus: string,
    error: string, // fetch error message
    ruleEdit: {
      _id: string, // mongodb _id
      isDirty: boolean,
      criteria: [
        {
          _id: string // mongodb _id,
          field: string,
          operation: string,
          value: string || number
          action: boolean
        }
      ],
      actions: [
        {
          _id: string // mongodb _id,
          actionsType: 'replaceAll',
          field: "description",
          replaceWithValue: string || number,
        },
        {
          _id: string // mongodb _id,
          actionType: "categorize",
          category1: string,
          category2: string
        }
      ]
    }
  },
  criteriaResults: {
    items: array, // of transaction objects
    criteriaResultsFetchStatus: string,
    error: string // fetch error message
  },
  transactionsUi: {
    options: {
      ruleRadio: {
        value: 'all' || 'hasRule' || 'doesNotHaveRule'
      },
      categorizeRadio: {
        value: 'both' || 'categorized' || 'uncategorized',
        disabled: boolean,
      }
    },
    filters: {
      acctId: string,
      amount: number,
      category1: string,
      category2: string,
      date: string, // a string date,
      description: string,
      type: string
    }
  }
}
```