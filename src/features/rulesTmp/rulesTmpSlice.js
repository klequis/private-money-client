import { createSlice, current } from '@reduxjs/toolkit'

import shortid from 'shortid'

// eslint-disable-next-line
import { green, red } from 'logger'

const initialState = []

const rulesTmpSlice = createSlice({
  name: 'rulesTmp',
  initialState,
  reducers: {
    ruleTmpCreate(state, action) {
      // payload will be an Id
      const newRule = {
        _id: action.payload,
        criteria: [
          {
            _id: `tmp_${shortid.generate()}`,
            field: '',
            operation: '',
            value: ''
          }
        ],
        actions: [
          {
            _id: `tmp_${shortid.generate()}`
          }
        ]
      }

      state.push(newRule)
    },
    // TODO:
    ruleTmpUpdate(state, action) {

    },
    // TODO: 
    ruleTmpDelete(state, action) {

    }
  }
})

export default rulesTmpSlice.reducer

export const { ruleTmpCreate } = rulesTmpSlice.actions

const getTmpRule = (ruleTmpId, state) => state.rulesTmp.find(r => r._id === ruleTmpId)


export const selectTmpRuleCriteria = (ruleTmpId, state) => {
  const { criteria } = getTmpRule(ruleTmpId, state)
  return criteria
}

export const selectTmpRuleActions = (ruleTmpId, state) => {
  const { actions } = getTmpRule(ruleTmpId, state)
  return actions
}