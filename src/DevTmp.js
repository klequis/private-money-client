import React, { useEffect } from 'react'
import App from './App'
import { useDispatch, useSelector } from 'react-redux'
import { setActiveTransactionId, selectActiveTransactionId } from 'features/transactions/transactionsSlice'
import * as R from 'ramda'

import { green, red } from 'logger'

const DevTmp = () => {
  green('devTmp')  

  const dispatch = useDispatch()


  useEffect(() => {
    green('effect ***')
    dispatch(setActiveTransactionId('5f77bee16b52d522df1c2bb1'))
  })

  const activeTransactionId = useSelector(selectActiveTransactionId)
  green('activeTransactionId', activeTransactionId)

  if (R.type(activeTransactionId) === 'Null') {
    return null
  }

  red('DevTmp: activeTransactionId', activeTransactionId)


  return <App activeTransactionId={activeTransactionId} />
}

export default DevTmp