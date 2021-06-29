import { configureStore } from '@reduxjs/toolkit'
import { txReducer } from 'features/tx'
import { rulesReducer } from 'features/rules'
import { criteriaResultsReducer } from 'features/criteriaResults'
import { txTblReducer } from 'features/txTbl'
import { uploadReducer } from 'features/upload'
import { acctReducer } from 'features/acct'

export const store = configureStore({
  reducer: {
    tx: txReducer,
    rules: rulesReducer,
    criteriaResults: criteriaResultsReducer,
    txTbl: txTblReducer,
    upload: uploadReducer,
    acct: acctReducer
  }
})
