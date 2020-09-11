import React from 'react'
import { useDispatch } from 'react-redux'

// import Criteria from './Criteria'
// import Actions from './Actions'
// import Button from 'components/Button'
// import RuleId from './RuleId'
// import Container from 'react-bootstrap/Container'
import styles from './CreateRules.module.css'
import Rules from './Rules'
import {
  // selectOneTransaction,
  setActiveTransactionId,
  // selectActiveTransactionId,
  // selectTransactionRuleIds
} from 'features/transactions/transactionsSlice'


// Tmp
// import { fetchTransactions, selectTransactionsStatus, selectTransactionsError } from 'features/transactions/transactionsSlice'
// import { fetchRules, selectRulesError } from 'features/rules/rulesSlice'

// eslint-disable-next-line
import { green, redf, yellow, blue } from 'logger'

const styleRed = { backgroundColor: 'red' }
// const styleGreen = { backgroundColor: 'green' }
// const styleBlue = { backgroundColor: 'blue' }
// const stylePurple = { backgroundColor: 'purple' }
// const styleOrange = { backgroundColor: 'orange' }

/*
    In final version
    - activeTransactionId will be set by <TableBody>
*/

const CreateRules = () => {
  // TODO: tmp code - start
  const dispatch = useDispatch()
  dispatch(setActiveTransactionId('5f0e673cd6c7ae2de0a57b92'))
  // tmp code - end
  
  return (
    <div className={styles.page} style={styleRed}>
      <div className={styles.rules}>
        <h1 className={styles.sectionTitle}>Rules</h1>
        <Rules />
      </div>
      <div className={styles.transactions}>
        <h1 className={styles.sectionTitle}>Transactions</h1>
      </div>
    </div>
  )
}

export default CreateRules


/*



*/