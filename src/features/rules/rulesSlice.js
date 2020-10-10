import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from 'api'
import { requestStatus } from 'globalConstants'
import * as R from 'ramda'
// import { logFetchResults } from 'lib/logFetchResults'


// 
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
      const newAction = action.payload
      const actions = R.path(['ruleEdit', 'actions'], state)
      const idx = R.findIndex(R.propEq('_id', R.prop('_id', newAction)))(
        actions
      )
      const newActions = R.update(idx, newAction, actions)
      const newState = R.assocPath(['ruleEdit', 'actions'], newActions, state)
      return newState
    }
  },
  extraReducers: {
    [fetchRules.pending]: (state, action) => {
      // logFetchResults('fetchRules.pending', state, action)      
      state.status = requestStatus.pending
      state.items = []
    },
    [fetchRules.fulfilled]: (state, action) => {
      // logFetchResults('fetchRules.fulfilled', state, action)      
      state.status = requestStatus.fulfilled
      state.items = action.payload.data
    },
    [fetchRules.rejected]: (state, action) => {
      // logFetchResults('fetchRules.rejected', state, action)      
      state.status = requestStatus.error
      state.error = action.error.message
      state.items = []
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
  R.has('rules')(state) ? state.rules.items : R.path(['state', 'items'], state)

const getRule = (ruleId, state) =>
  getRulesItems(state).find((r) => r._id === ruleId)

const hasRuleEdit = state => !(R.path(['state', 'rules', 'ruleEdit']) === null)

export const selectRuleEdit = (state) => R.path(['state', 'rules', 'ruleEdit'], state)

export const selectRuleEditCriteria = (state) => {
  return hasRuleEdit(state) ? R.path(['rules', 'ruleEdit', 'criteria'], state) : []

  // if (hasRuleEdit(state)) {
  //   blue('hasRuleEdit', true)
  //   return state.rules.ruleEdit.criteria
  // } else {
  //   blue('hasRuleEdit', false)
  //   return null
  // }
}

export const selectRuleEditActions = (state) => {
  return hasRuleEdit(state) ? R.path([state.rules.ruleEdit.actions], state) : null
}

export const selectRulesStatus = (state) => R.path(['state', 'transactions', 'status'], state)

export const selectRulesError = (state) => R.path(['state', 'transactions', 'error'], state)

export const selectRuleCriteria = (ruleId, state) => {
  const { criteria } = getRule(ruleId, state)
  return criteria
}

export const selectRuleActions = (ruleId, state) => {
  const { actions } = getRule(ruleId, state)
  return actions
}

export const selectOneRule = (ruleId, state) =>
  R.find(R.propEq('_id', ruleId))(R.path(['state', 'rules', 'items'], state))

export const selectRuleEditId = (state) => {
  return R.path(['rules', 'ruleEdit', '_id'], state)
}