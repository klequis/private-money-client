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