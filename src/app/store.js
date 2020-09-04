import { configureStore } from '@reduxjs/toolkit';
import transactionsReducer from 'features/transactions/transactionsSlice'
import rulesReducer from 'features/rules/rulesSlice'
import rulesTmpReducer from 'features/rulesTmp/rulesTmpSlice'

export default configureStore({
  reducer: {
    transactions: transactionsReducer,
    rules: rulesReducer,
    rulesTmp: rulesTmpReducer
  },
});
