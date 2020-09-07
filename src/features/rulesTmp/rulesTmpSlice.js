import { createSlice, current } from '@reduxjs/toolkit'

import shortid from 'shortid'

// eslint-disable-next-line
import { green, red } from 'logger'

const initialState = []

/*
    Create a replaceAll action for description
    - description
    Create a categorize action

*/
const rulesTmpSlice = createSlice({
  name: 'rulesTmp',
  initialState,
  reducers: {
    ruleTmpCreate(state, action) {
      // payload will be an Id
      green('ruleTmpCreate: action', action)
      const { tmpId, origDescription} = action.payload
      green('ruleTmpCreate: tmpId', tmpId)
      const ruleNew = {
        _id: tmpId,
        criteria: [
          {
            _id: `tmp_${shortid.generate()}`,
            field: 'description',
            operation: 'equals',
            value: origDescription
          }
        ],
        actions: [
          {
            _id: `tmp_${shortid.generate()}`,
            actionType: 'replaceAll',
            field: 'description',
            replaceWithValue: origDescription
          },
          {
            _id: `tmp_${shortid.generate()}`,
            actionType: 'categorize',
            category1: '',
            category2: ''
          }
        ]
      }
      green('ruleTmpCreate: ruleNew', ruleNew)

      state.push(ruleNew)
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