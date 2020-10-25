import { 
  createSlice, 
  createAsyncThunk, 
  current } from '@reduxjs/toolkit'
import * as R from 'ramda'
import * as Promise from 'bluebird'
import api from 'api'
import { ruleTmpMake } from './ruleTmpMake'

// eslint-disable-next-line
import { blue } from 'logger'

const getActiveCriteria = (criteria) => {
  return criteria === null ? [] : criteria.filter((c) => c.active === true)
}

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
      blue('state', current(state))
      const { payload } = action
      state.ruleEdit = payload // || {}
    },
    ruleEditClear(state, action) {
      state.ruleEdit = {}
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
    },
    ruleEditTmpMake(state, action) {
      state.ruleEdit = ruleTmpMake()
    }
  }
})

export const ruleEditReducer = ruleEditSlice.reducer

export const {
  ruleEditActionUpdate,
  ruleEditClear,
  ruleEditCriterionUpdate,
  ruleEditSet,
  ruleEditTmpMake
} = ruleEditSlice.actions

// const hasRuleEdit = state => !(R.path(['state', 'ruleEdit']) === null)

/**
 * 
 * @param {*} state 
 * @return {object} state.ruleEdit
 */
export const selectRuleEdit = (state) => {
  const ruleEdit = R.path(['ruleEdit', 'ruleEdit',], state)
  return R.isNil(ruleEdit) ? {} : ruleEdit
}

/**
 * 
 * @param {object} state 
 * @returns {array} Returns criteria from state.ruleEdit
 */
export const selectRuleEditCriteria = (state) => {
  const criteria = R.path(['ruleEdit', 'ruleEdit', 'criteria'], state)
  return R.isNil(criteria) ? [] : criteria
}

/**
 * 
 * @param {object} state 
 * @returns {array} 
 * @description Gets criteria from state.RuleEdit where criteria.active===true
 */
export const selectActiveCriteria = (state) => {
  const criteria = R.path(['ruleEdit', 'ruleEdit', 'criteria'], state)
  return R.isNil(criteria) ? [] : getActiveCriteria(criteria)
}

/**
 * 
 * @param {object} state 
 * @returns {array} 
 * @description Gets criteria from state.RuleEdit where criteria.active===true
 */
export const selectRuleEditActions = (state) => {
  const actions = R.path(['ruleEdit', 'ruleEdit', 'actions'], state)
  return R.isNil(actions) ? [] : actions
}

/**
 * 
 * @param {object} state
 * @returns {string} state.ruleEdit._id
 */
export const selectRuleEditId = (state) => {
  const id = R.path(['ruleEdit', 'ruleEdit', '_id'], state)
  return R.isNil(id) ? '' : id
}
