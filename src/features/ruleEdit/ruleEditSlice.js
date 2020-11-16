import { 
  createSlice, 
  createAsyncThunk, 
  current } from '@reduxjs/toolkit'
import { api } from 'api'
import { ruleTmpMake } from './ruleTmpMake'
import { requestStatus } from 'globalConstants'
import { logFetchResults } from 'lib/logFetchResults'
import * as R from 'ramda'

// eslint-disable-next-line
import { blue, red, purple } from 'logger'

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
    purple('ruleCreate: rule', rule)
    const newRule = R.pipe(
      removeInactiveCriteria,
      removeTmpIdField
    )(rule)
    await api.rules.create(newRule)
  }
)

export const ruleUpdate = createAsyncThunk(
  'rules/rule-update',
  async (rule) => {
    purple('ruleUpdate: rule', rule)
    const newRule = removeInactiveCriteria(rule)
    await api.rules.update(rule._id, newRule)
  }
)

const initialState = {
  status: requestStatus.idle,
  error: null,
  dirty: null
}

const ruleEditSlice = createSlice({
  name: 'ruleEdit',
  initialState,
  reducers: {
    /**
     * 
     * @param {object} state 
     * @param {object} action 
     * @description action.payload is a rule
     * @description gets 
     */
    ruleEditSet(state, action) {
      const { payload } = action
      state.ruleEdit = payload
    },
    ruleEditClear(state, action) {
      state.ruleEdit = {}
    },
    ruleEditCriterionUpdate(state, action) {
      const newCriterion = action.payload
      const criteria = R.path(['ruleEdit', 'criteria'], state)
      const newCriterionId = R.prop('_id', newCriterion)
      const idx = R.findIndex(R.propEq('_id', newCriterionId))(criteria)
      const newCriteria = R.update(idx, newCriterion, criteria)
      const newState = R.assocPath(['ruleEdit', 'criteria'], newCriteria, state)
      newState.dirty = true
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
      newState.dirty = true
      return newState
    },
    ruleEditSave(state, action) {
      // if tmpRuleId -> remove the _id field and call insert
      // else call update
    },
    ruleEditTmpMake(state, action) {
      const { payload } = action
      const { origDescription, date } = payload
      state.ruleEdit = ruleTmpMake(origDescription, date)
    }
  },
  extraReducers: {
    [ruleCreate.pending]: (state, action) => {
      // logFetchResults('ruleEdit.pending', state, action)
      state.status=requestStatus.pending
    },
    [ruleCreate.fulfilled]: (state, action) => {
      // logFetchResults('ruleEdit.fulfilled', state, action)
      state.status=requestStatus.fulfilled
    },
    [ruleCreate.rejected]: (state, action) => {
      logFetchResults('ruleEdit.rejected', state, action)
      red('ruleEdit.ruleCreate.rejected', 'rejected')
      state.status = requestStatus.error
      state.error = action.error.message
    },
    // ruleUpdate
    [ruleUpdate.pending]: (state, action) => {
      // logFetchResults('ruleEdit.pending', state, action)
      state.status=requestStatus.pending
    },
    [ruleUpdate.fulfilled]: (state, action) => {
      // logFetchResults('ruleEdit.fulfilled', state, action)
      state.status=requestStatus.fulfilled
    },
    [ruleUpdate.rejected]: (state, action) => {
      // logFetchResults('ruleEdit.rejected', state, action)
      red('ruleEdit.ruleUpdate.rejected', 'rejected')
      state.status = requestStatus.error
      state.error = action.error.message
    },
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

/**
 * 
 * @param {object} state
 * @returns {string} state.ruleEdit.dirty
 */
export const selectRuleEditIsDirty = (state) => {
  return R.path(['ruleEdit', 'dirty'], state)
}

/**
 * 
 * @param {object} state
 * @returns {string} state.ruleEdit.isTmpRule
 */
export const selectRuleEditIsTmpRule = (state) => {
  return R.path(['ruleEdit', 'ruleEdit', 'isTmpRule'], state)
}