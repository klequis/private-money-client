import { configureStore } from '@reduxjs/toolkit'
import { transactionsReducer } from 'features/transactions'
import { rulesReducer } from 'features/rules'
import { criteriaResultsReducer } from 'features/criteriaResults'
import { ruleEditReducer } from 'features/ruleEdit'

export default configureStore({
  reducer: {
    transactions: transactionsReducer,
    rules: rulesReducer,
    criteriaResults: criteriaResultsReducer,
    ruleEdit: ruleEditReducer
  }
})
