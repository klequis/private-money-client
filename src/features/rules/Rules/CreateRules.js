import React from 'react'
// import { useDispatch } from 'react-redux'
import Rules from './Rules'
import CriteriaResults from './CriteriaResults'
import RenderCount from 'components/RenderCount'

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

let count = 0
const expected = 1

const CreateRules = React.memo(() => {
  count = count + 1
  return (
    <div id="CreateRules">
      <RenderCount name='CreateRules' countTotal={count} countTotalExpected={expected} />
      <div id="CreateRules.Rules">
        <Rules />
      </div>
      <div id="CreateRules.Transactions">
        <CriteriaResults />
      </div>
    </div>
  )
})

export default CreateRules

/*



*/
