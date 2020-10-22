import { configureStore } from '@reduxjs/toolkit'
import { transactionsReducer } from 'features/transactions'
import { rulesReducer } from 'features/rules'
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
