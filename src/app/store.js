import { configureStore } from '@reduxjs/toolkit'
import transactionsReducer from 'features/transactions/transactionsSlice'
import rulesReducer from 'features/rules/rulesSlice'
import criteriaResultsReducer from 'features/criteriaResults/criteriaResultsSlice'

export default configureStore({
  reducer: {
    transactions: transactionsReducer,
    rules: rulesReducer,
    criteriaResults: criteriaResultsReducer
  }
})
