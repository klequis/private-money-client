import { configureStore } from '@reduxjs/toolkit'
import transactionsReducer from 'features/transactions/transactionsSlice'
import rulesReducer from 'features/rules/rulesSlice'
import criteriaResultsReducer from 'features/criteriaResults/criteriaResultsSlice'
import ruleEditReducer from 'features/ruleEdit/ruleEditSlice'

export default configureStore({
  reducer: {
    transactions: transactionsReducer,
    rules: rulesReducer,
    criteriaResults: criteriaResultsReducer,
    ruleEdit: ruleEditReducer
  }
})
