import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit'
import * as R from 'ramda'

import { transactionsFetch } from 'features/transactions/transactionsSlice'
import { rulesFetch } from 'features/rules/rulesSlice'
import * as Promise from 'bluebird'

// eslint-disable-next-line
import { blue } from 'logger'
import api from 'api'

const getActiveCriteria = (criteria) =>
  criteria === null ? [] : criteria.filter((c) => c.active === true)

const removeInactiveCriteria = (rule) => {
  const { criteria } = rule
  const activeCriteria = getActiveCriteria(criteria)
  return R.mergeRight(rule, { criteria: activeCriteria })
}

const removeTmpIdField = (rule) => {
  return R.has('_id')
    ? R.dissoc('_id', rule)
    : rule
}

export const ruleCreate = createAsyncThunk(
  'rules/rule-create',
  async (rule) => {
    const newRule = R.pipe(
      removeInactiveCriteria,
      removeTmpIdField
    )(rule)
    await api.rules.create(newRule)
    Promise.all([
      api.views.read('all-data-by-description'),
      api.rules.read()
    ])
  }
)

export const ruleUpdate = createAsyncThunk(
  'rules/rule-update',
  async (rule) => {
    const newRule = removeInactiveCriteria(rule)
    await api.rules.update(rule._id, newRule)
    Promise.all([
      api.views.read('all-data-by-description'),
      api.rules.read()
    ])
  }
)

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
export const selectRuleEdit = (state) => R.path(['ruleEdit', 'ruleEdit',], state)

export const selectRuleEditCriteria = (state) => {
  return R.path(['ruleEdit', 'ruleEdit', 'criteria'], state) || []
}

export const selectRuleEditActions = (state) => {
  return R.path(['ruleEdit', 'ruleEdit', 'actions'], state) || null
}

export const selectRuleEditId = (state) => {
  return R.path(['ruleEdit', 'ruleEdit', '_id'], state)
}