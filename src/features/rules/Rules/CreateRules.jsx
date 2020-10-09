import React from 'react'
// import { useDispatch } from 'react-redux'
import Rules from './Rules'
// import {
//   setActiveTransactionId,
// } from 'features/transactions/transactionsSlice'


// import CriteriaResults from './CriteriaResults'

// @ts-ignore
// eslint-disable-next-line
import { purple, green, redf, yellow, blue } from 'logger'

// .page {
//   width: 100vw;
//   height: 100vh;
//   display: flex;purple('App', 'render-1')
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
  purple('>>> CreateRules', 'render')
  

  return (
    <div id="CreateRules">
      <div id="CreateRules.Rules">
        <h1>Rules</h1>
        <Rules />
      </div>
      <div id="CreateRules.Transactions">
        {/* <CriteriaResults /> */}
      </div>
    </div>
  )
}

export default CreateRules

/*



*/
