```js
state = {
  criteriaResults: {
    fetch: {
      error: '?',
      status: string,
    },
    items: array,
  },
  rules: {
    create: {
      error: '?',
      status: string,
    },
    fetch: {
      error: '?',
      status: string,
    },
    items: array,
    ruleEdit: {
      _id: string,
      actions: array,
      criteria: array,
      hasActionTypeOmit: boolean,
      isDirty: boolean,
      isTmpRule: boolean,
    },
    update: {
      error: '?',
      status: string,
    }
  },
  tx: {
    activeId: string,
    fetch: {
      error: '?',
      status: string,
    },
    items: array
  },
  txTbl: {
    filters: {
      acctId: string,
      category1: string,
      category2: string,
      date: string,
      description: string,
      type: string
    },
    radioCategorized: {
      disabled: boolean,
      value: any,
    },
    radioHasRule: {
      value: any
    },
  }
}

```


```js
TxColHead {
  _valueChanged = () => {
    _setValue(value)
  }

  useEffect(
    if (debouncedValue) {
      updateFilters(name; fieldName, value: debouncedValue)
    }
  ), [debouncedValue, dispatch, fieldName]
}

```

## Rules
- _value === debouncedValue
- updateFilters on debouncedValueChange



```js
TxColHead {
  txTblSlice.updateFilters({ name: fieldName, value }) {
    return filterUpdate(finalVal, path, currState) {
      return setStateValue(wdTxTbl, path, value, state)
    }
  }

}
```