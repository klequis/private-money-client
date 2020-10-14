import { createSlice, current } from '@reduxjs/toolkit'
import * as R from 'ramda'

// eslint-disable-next-line
import { blue } from 'logger'

const initialState = {}

const ruleEditSlice = createSlice({
  name: 'ruleEdit',
  initialState,
  reducers: {
    ruleEditSet(state, action) {
      const { payload } = action
      state.ruleEdit = payload // || {}
    },
    ruleEditCriterionUpdate(state, action) {
      const newCriterion = action.payload
      const criteria = R.path(['ruleEdit', 'criteria'], state)
      const idx = R.findIndex(R.propEq('_id', R.prop('_id', newCriterion)))(
        criteria
      )
      const newCriteria = R.update(idx, newCriterion, criteria)
      const newState = R.assocPath(['ruleEdit', 'criteria'], newCriteria, state)
      return newState
    },
    ruleEditActionUpdate(state, action) {
      const newAction = action.payload
      const actions = R.path(['ruleEdit', 'actions'], state)
      const idx = R.findIndex(R.propEq('_id', R.prop('_id', newAction)))(
        actions
      )
      const newActions = R.update(idx, newAction, actions)
      const newState = R.assocPath(['ruleEdit', 'actions'], newActions, state)
      return newState
    },
    ruleEditSave(state, action) {
      // if tmpRuleId -> remove the _id field and call insert
      // else call update
    }
  }
})

export default ruleEditSlice.reducer

export const {
  ruleEditSet,
  ruleEditCriterionUpdate,
  ruleEditActionUpdate
} = ruleEditSlice.actions

// const hasRuleEdit = state => !(R.path(['state', 'ruleEdit']) === null)
export const selectRuleEdit = (state) => R.path(['state', 'ruleEdit', 'ruleEdit',], state)

export const selectRuleEditCriteria = (state) => {
  return R.path(['ruleEdit', 'ruleEdit', 'criteria'], state) || []
}

export const selectRuleEditActions = (state) => {
  return R.path(['ruleEdit', 'ruleEdit', 'actions'], state) || null
}

export const selectRuleEditId = (state) => {
  return R.path(['ruleEdit', 'ruleEdit', '_id'], state)
}