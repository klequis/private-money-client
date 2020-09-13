import { configureStore } from '@reduxjs/toolkit';
import transactionsReducer from 'features/transactions/transactionsSlice'
import rulesReducer from 'features/rules/rulesSlice'

export default configureStore({
  reducer: {
    transactions: transactionsReducer,
    rules: rulesReducer,
  },
});
