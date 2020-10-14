import React from 'react'
// import { useDispatch } from 'react-redux'
import Rule from './Rule'
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
//   f>
let count = 0

const CreateRule = React.memo(() => {
  count = count + 1
  return (
    <div id="CreateRules">
      <RenderCount 
        name='CreateRules' 
        countTotal={{ actual: count, min: 1, max: 1 }}
        // countReturn={{ actual: count, min: 1, max: 1 }}
      />
      <div id="CreateRules.Rules">
        <Rule />
      </div>
      <div id="CreateRules.Transactions">
        <CriteriaResults />
      </div>
    </div>
  )
})

export default CreateRule

/*



*/
