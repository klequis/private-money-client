import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from 'api'
import { requestStatus } from 'globalConstants'
import * as R from 'ramda'
import { logFetchResults } from 'lib/logFetchResults'


// 
// @ts-ignore 
// eslint-disable-next-line
import { blue, red } from 'logger'



const initialState = {
  items: [],
  status: 'idle',
  error: null,
  ruleEdit: null,
  isEditMode: false
}

export const fetchRules = createAsyncThunk('rules/get', async () => {
  const r = await api.rules.read()
  return r
})

const rulesSlice = createSlice({
  name: 'rules',
  initialState,
  reducers: {
    setRuleEdit(state, action) {
      const { payload } = action
      state.ruleEdit = payload || {}
    },
    updateRuleEditCriterion(state, action) {
      const newCriterion = action.payload
      const criteria = R.path(['ruleEdit', 'criteria'], state)
      const idx = R.findIndex(R.propEq('_id', R.prop('_id', newCriterion)))(
        criteria
      )
      const newCriteria = R.update(idx, newCriterion, criteria)
      const newState = R.assocPath(['ruleEdit', 'criteria'], newCriteria, state)
      return newState
    },
    updateRuleEditAction(state, action) {
      console.group('updateRuleEditAction') // TODO:
      const newAction = action.payload
      blue('newAction', newAction)
      const actions = R.path(['ruleEdit', 'actions'], state)
      const idx = R.findIndex(R.propEq('_id', R.prop('_id', newAction)))(
        actions
      )
      const newActions = R.update(idx, newAction, actions)
      const newState = R.assocPath(['ruleEdit', 'actions'], newActions, state)
      console.groupEnd() // TODO:
      return newState
    }
  },
  extraReducers: {
    // @ts-ignore
    [fetchRules.pending]: (state, action) => {
      // logFetchResults('fetchRules.pending', state, action)      
      state.status = requestStatus.pending
    },
    // @ts-ignore
    [fetchRules.fulfilled]: (state, action) => {
      // logFetchResults('fetchRules.fulfilled', state, action)      
      state.status = requestStatus.fulfilled
      state.items = action.payload.data
    },
    // @ts-ignore
    [fetchRules.rejected]: (state, action) => {
      logFetchResults('fetchRules.rejected', state, action)      
      state.status = requestStatus.error
      state.error = action.error.message
    }
  }
})

export default rulesSlice.reducer

export const {
  setRuleEdit,
  updateRuleEditCriterion,
  updateRuleEditAction
} = rulesSlice.actions

// const ruleEditId = (state) => state.rules.ruleEdit._id

const getRulesItems = (state) =>
  R.has('rules')(state) ? state.rules.items : state.items

const getRule = (ruleId, state) =>
  getRulesItems(state).find((r) => r._id === ruleId)

const hasRuleEdit = state => !(state.rules.ruleEdit === null)

export const selectRuleEdit = (state) => state.rules.ruleEdit

export const selectRuleEditCriteria = (state) => {
  return hasRuleEdit(state) ? state.rules.ruleEdit.criteria : null

  // if (hasRuleEdit(state)) {
  //   blue('hasRuleEdit', true)
  //   return state.rules.ruleEdit.criteria
  // } else {
  //   blue('hasRuleEdit', false)
  //   return null
  // }
}

export const selectRuleEditActions = (state) => {
  return hasRuleEdit(state) ? state.rules.ruleEdit.actions : null
}

export const selectRulesStatus = (state) => state.transactions.status

export const selectRulesError = (state) => state.transactions.error

export const selectRuleCriteria = (ruleId, state) => {
  const { criteria } = getRule(ruleId, state)
  return criteria
}

export const selectRuleActions = (ruleId, state) => {
  const { actions } = getRule(ruleId, state)
  return actions
}

export const selectOneRule = (ruleId, state) =>
  R.find(R.propEq('_id', ruleId))(state.rules.items)
