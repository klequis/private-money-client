import { configureStore } from '@reduxjs/toolkit'
import { transactionsReducer } from 'features/transactions'
import { rulesReducer } from 'features/rules'
import { criteriaResultsReducer } from 'features/criteriaResults'
import { transactionsUiReducer } from 'features/uiSettings/transactionsUiSlice'

export const store = configureStore({
  reducer: {
    transactions: transactionsReducer,
    rules: rulesReducer,
    criteriaResults: criteriaResultsReducer,
    transactionsUi: transactionsUiReducer  
  }
})
