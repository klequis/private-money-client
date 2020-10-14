import React from 'react'
import { useSelector } from 'react-redux'
import Criteria from './Criteria'

import Actions from './Actions'
import Button from 'components/Button'
import RuleId from './RuleId'
import { selectRuleEditId } from 'features/ruleEdit/ruleEditSlice'

// eslint-disable-next-line
import { green, purple } from 'logger'
import RenderCount from 'components/RenderCount'

let countTotal = 0
let countReturn = 0

const Rule = () => {
  countTotal = countTotal + 1

  const ruleId = useSelector(selectRuleEditId)

  const _handleSaveEditButtonClick = () => { 
    // 1. call ruleEditSave.ruleEditSave 

  }

  countReturn = countReturn + 1
  return (
    <div>
      <div id="RuleEdit">
        <RenderCount
          componentName="RuleEdit"
          countTotal={{ actual: countTotal, min: 1, max: 2 }}
          countReturn={{ actual: countReturn, min: 2, max: 2 }}
        />
        <div className="d-flex">
          <RuleId ruleId={ruleId} />
          <Button onClick={_handleSaveEditButtonClick}>Save</Button>
          <svg
            width="1em"
            height="1em"
            viewBox="0 0 16 16"
            className="bi bi-plus-circle-fill text-success"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"
            />
          </svg>
        </div>
      </div>
      <Criteria />
      <Actions />
    </div>
  )
}

export default Rule

