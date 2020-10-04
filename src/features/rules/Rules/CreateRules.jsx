import React from 'react'
import { useDispatch } from 'react-redux'
import Rules from './Rules'
import {
  setActiveTransactionId,
} from 'features/transactions/transactionsSlice'


import CriteriaResults from './CriteriaResults'

// eslint-disable-next-line
import { green, redf, yellow, blue } from 'logger'

// .page {
//   width: 100vw;
//   height: 100vh;
//   display: flex;
// }

// .sectionTitle {
//   text-align: center;
//   width: 100%;
//   /* background-color: blue; */
// }

// .rules {
//   flex-basis: 30%;
//   border-right: 1px solid white;
// }

// .transactions {
//   flex-basis: 100%;
// }

const CreateRules = () => {
  // TODO: tmp code - start
  /*
    In final version
    - activeTransactionId will be set by <TableBody>
  */
  const dispatch = useDispatch()
  dispatch(setActiveTransactionId('5f77bee16b52d522df1c2af6'))
                                   
  // tmp code - end

  return (
    <div id="CreateRules">
      <div id="CreateRules.Rules">
        <h1>Rules</h1>
        <Rules />
      </div>
      <div id="CreateRules.Transactions">
        <CriteriaResults />
      </div>
    </div>
  )
}

export default CreateRules

/*



*/
