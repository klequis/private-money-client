import { configureStore } from '@reduxjs/toolkit'
import { txReducer } from 'features/tx'
import { rulesReducer } from 'features/rules'
import { criteriaResultsReducer } from 'features/criteriaResults'
import { txTblReducer } from 'features/txTbl'

export const store = configureStore({
  reducer: {
    tx: txReducer,
    rules: rulesReducer,
    criteriaResults: criteriaResultsReducer,
    txTbl: txTblReducer
  }
})
