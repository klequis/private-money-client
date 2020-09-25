import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchTransactions, selectTransactionsStatus, selectTransactionsError } from 'features/transactions/transactionsSlice'
import { fetchRules, selectRulesError } from 'features/rules/rulesSlice'
import { requestStatus } from 'globalConstants'
import Table from './Table'

// eslint-disable-next-line
import { green } from 'logger'

const getRequestStatus = (slices = [], state) => {
  const any = (status) =>
    slices.map((s) => state[s].status === status).some((x) => x === true)
  if (any(requestStatus.error)) {
    return requestStatus.error
  } else if (any(requestStatus.pending || any(requestStatus.idle))) {
    return requestStatus.pending
  } else if (any(requestStatus.fulfilled)) {
    return requestStatus.fulfilled
  }
}

const AllDataByDescription = () => {
  // const dispatch = useDispatch()
  // const transactionsStatus = useSelector((state) => selectTransactionsStatus(state))
  // const transactionsError = useSelector((state) => selectTransactionsError(state))
  // const rulesError = useSelector((state) => selectRulesError(state))
  // const state = useSelector((state) => state)

  

  // useEffect(() => {
  //   if (transactionsStatus === 'idle') {
  //     dispatch(fetchTransactions())
  //     dispatch(fetchRules())
  //   }
  // }, [fetchTransactions, dispatch])

  // const status = getRequestStatus(['transactions', 'rules'], state)

  // switch (status) {
  //   case requestStatus.pending:
  //     return <h1>Loading</h1>
  //   case requestStatus.fulfilled:
      return <Table />
    // case requestStatus.error:
    // default:
    //   return (
    //     <div>
    //       <div>transactions error: {transactionsError}</div>
    //       <div>rules error: {rulesError}</div>
    //     </div>
    //   )
  
}

export default AllDataByDescription
