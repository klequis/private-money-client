import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit'
import * as R from 'ramda'
import {
  transactionOptionValues as optionValues,
  transactionOptionNames
} from 'globalConstants'
// import { isNilOrEmpty } from 'lib/isNilOrEmpty'

// eslint-disable-next-line
import { blue, red } from 'logger'

const { ruleRadio, categorizeRadio } = transactionOptionNames


const initialState = {
  options: {
    [ruleRadio]: {
      value: optionValues.all,
    },
    [categorizeRadio]: {
      value: optionValues.both,
      disabled: false
    },
  },
  filters: {
    acctId: null,
    amount: null,
    category1: null,
    category2: null,
    date: null,
    description: null,
    type: null
  }
}



// const _makeOptionStateUpdate = (name, value, state) => {
//   blue('_makeOptionStateUpdate: state', state)
//   return {
//     [ruleRadio]: {
//       value: R.path(['options', ruleRadio, 'value'], state) // state.ruleRadio.value
//     },
//     [categorizeRadio]: {
//       value: name === categorizeRadio ? value : R.path(['options', categorizeRadio, 'value'], state), // state.categorizeRadio.value,
//       disabled: value === optionValues.doesNotHaveRule ? true : false
//     }
//   }
// }

const valueOrEmptyString = (value) => isNilOrEmpty(value) ? '' : value

const transactionsUiSlice = createSlice({
  name: 'transactionsUi',
  initialState,
  reducers: {
    updateRadioState(state, action) {
      const { name, value } = action.payload
      state.options.ruleRadio.value = name === ruleRadio
        ? value
        : R.path(['options', ruleRadio, 'value'], state) // state.ruleRadio.value
      state.options.categorizeRadio.value = name === categorizeRadio
        ? value
        : R.path(['options', categorizeRadio, 'value'], state) // state.categorizeRadio.value,
      state.options.categorizeRadio.disabled = value === optionValues.doesNotHaveRule
        ? true
        : false
    },
    updateFilters(state, action) {
      const { name, value } = action.payload
      state.filters[name] = valueOrEmptyString(value)
    },

    isUncategorizedToggle(state) {
      state.isUncategorized.checked = !state.isUncategorized.checked
    },
    hasRulesToggle(state) {
      state.hasRules.checked = !state.hasRules.checked
    }
    // hasRulesOn(state, action) {
    //   
    // },
    // hasRulesOff(state, action) {
    //   state.hasRules.checked = false
    // },
    // hasCategoryOn(state, action) {
    //   state.hasCategory.checked = true
    // },
    // hasCategoryOff(state, action) {
    //   state.hasCategory.checked = false
    // }
  }
})

export const transactionsUiReducer = transactionsUiSlice.reducer

export const {
  // hasRulesOff,
  // hasRulesOn,
  // hasCategoryOn,
  // hasCategoryOff
  isUncategorizedToggle,
  hasRulesToggle,
  updateFilters,
  updateRadioState
} = transactionsUiSlice.actions

export const selectHasRulesChecked = (state) => R.path(['transactionsUi', 'hasRules', 'checked'], state)
export const selectIsUncategorizedChecked = (state) => R.path(['transactionsUi', 'isUncategorized', 'checked'], state)
export const selectOptionState = state => R.path(['transactionsUi', 'options'], state)

const isNilOrEmpty = value => R.isNil(value) || R.isEmpty(value)
const notNilOrEmpty = value => !R.isNil(value) && !R.isEmpty(value)

// const ruleIdsTest = (currentConditions) => {
//   console.group('ruleIdsTest')
//   const transactionsOpt = R.prop('transactionsOpt')(currentConditions) // prop val || undefiend
//   const hasTransactionsOpt = R.has('transactionsOpt')(currentConditions)
//   if (!hasTransactionsOpt) {

//     return undefined
//   }
//   if (transactionsOpt === 'hasRule') {
//     return notNilOrEmpty
//   }
//   if (transactionsOpt === 'doesNotHaveRule') {
//     return isNilOrEmpty
//   }
//   console.groupEnd()
//   return undefined // no error just won't work

// }


// const makeSpec = (currentConditions) => {
//   console.group('makeSpec')
//   // props should be a function || undefined
//   const m = {
//     ruleIds: ruleIdsTest(currentConditions)
//   }
//   blue('m', m)
//   console.groupEnd()
// }

const makeConditions = (transactionsUi) => {
  const { options, filters } = transactionsUi
  const {
    date,
    acctId,
    description,
    amount,
    category1,
    category2,
    type
  } = filters
  const transactionsOptValue = R.path(['ruleRadio', 'value'], options)
  const categoryOptValue = R.path(['categorizeRadio', 'value'], options)

  const allConditions = {
    hasRule: transactionsOptValue === 'hasRule' ? 'hasRule' : null,
    doesNotHaveRule: transactionsOptValue === 'doesNotHaveRule'
      ? 'doesNotHaveRule'
      : null,
    categorized: categoryOptValue === 'categorized' ? 'categorized' : null,
    uncategorized: categoryOptValue === 'uncategorized' ? 'uncategorized' : null,
    date,
    acctId,
    description,
    amount,
    category1,
    category2,
    type
  }

  // blue('allConditions', allConditions)

  // get only conditions that have active/current values
  const conditionFilter = val =>
    !isNilOrEmpty(val) // && !R.includes(val, ['all', 'both'])
  const currentConditions = R.filter(conditionFilter, allConditions)

  blue('currentConditions', currentConditions)
  return currentConditions
}

const allTests = transactionsUi => {
  
  const { filters } = transactionsUi
  const { date, acctId, description, amount, category1, category2, type} = filters
  blue('amount', R.type(amount))
  return {
    hasRule: notNilOrEmpty,
    doesNotHaveRule: isNilOrEmpty,
    categorized: notNilOrEmpty,
    uncategorized: isNilOrEmpty,
    date: R.test(new RegExp(date, 'i')),
    acctId: R.test(new RegExp(acctId, 'i')),
    description: R.test(new RegExp(description, 'i')),
    amount: R.test(new RegExp(amount, 'i')),
    // amount: R.equals(Number(amount)),
    category1: R.test(new RegExp(category1, 'i')),
    category2: R.test(new RegExp(category2, 'i')),
    type: R.test(new RegExp(type, 'i')),
  }
}

export const selectFilteredTransactions = (state) => {

  const { transactionsUi } = state
  const transactions = R.path(['transactions', 'items'], state)

  const { options, filters } = transactionsUi
  const {
    date,
    acctId,
    description,
    amount,
    category1,
    category2,
    type
  } = filters

  // match values to prop names

  // console.group('selectFilteredTransactions')
  // blue('actual has rule', R.filter(t => !isNilOrEmpty(t.ruleIds), transactions))


  const currentConditions = makeConditions(transactionsUi)

  if (isNilOrEmpty(currentConditions)) {
    // red('early exit', 'exit')
    // console.groupEnd()
    return transactions
  }

  // makeSpec(currentConditions)


  // get tests for currentConditions
  
  const a = R.pick(R.keys(currentConditions), allTests(transactionsUi))
  const spec1 = R.where(a)
  blue('spec1', spec1)

  
  // const spec2 = R.where({
  //   description: R.test(/COSTCO/)
  // })
  // blue('spec2', spec2)
  
  // const b = { description: R.test(/COSTCO/) }
  // const spec3 = R.where(b)
  // blue('spec3', spec3)
  


  // filter by spec
  const filteredTransactions = R.filter(spec1, transactions)

  // blue('transactions', transactions)
  // blue('filteredTransactions', filteredTransactions.length)

  // console.groupEnd()
  return filteredTransactions
}
