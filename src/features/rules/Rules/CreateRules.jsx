import React from 'react'
import { useDispatch } from 'react-redux'
import styles from './CreateRules.module.css'
import Rules from './Rules'
import {
  setActiveTransactionId,
} from 'features/transactions/transactionsSlice'


import CriteriaResults from './CriteriaResults'

// eslint-disable-next-line
import { green, redf, yellow, blue } from 'logger'

// const styleRed = { backgroundColor: 'red' }
// const styleGreen = { backgroundColor: 'green' }
// const styleBlue = { backgroundColor: 'blue' }
// const stylePurple = { backgroundColor: 'purple' }
// const styleOrange = { backgroundColor: 'orange' }

const CreateRules = () => {
  // TODO: tmp code - start
  /*
    In final version
    - activeTransactionId will be set by <TableBody>
  */
  const dispatch = useDispatch()
  // dispatch(setActiveTransactionId('5f0e673cd6c7ae2de0a57b92'))
  
  dispatch(setActiveTransactionId('5f0e673cd6c7ae2de0a57b5c'))
  // tmp code - end

  return (
    <div className={styles.page}>
      <div className={styles.rules}>
        <h1 className={styles.sectionTitle}>Rules</h1>
        <Rules />
      </div>
      <div className={styles.transactions}>
        <CriteriaResults />
      </div>
    </div>
  )
}

export default CreateRules

/*



*/
