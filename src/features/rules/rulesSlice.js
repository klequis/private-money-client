/**
 * @module rulesSlice.js
 */

import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit'
import { api } from 'api'
import * as R from 'ramda'
import { ruleTmpMake } from './ruleTmpMake'
import {
  getRule,
  removeInactiveCriteria,
  removeTmpIdField
} from 'features/helpers'
// import {
//   items,
//   error,
//   ruleEdit,
//   rulesFetchStatus,
//   ruleCreateStatus,
//   ruleUpdateStatus
// } from './pathWords'
import {
  selectRuleEditActions,
  selectRuleEditCriteria
} from 'features/selectors'
import {
  wdRequestStatusError,
  wdRequestStatusFulfilled,
  wdRequestStatusPending,
  wdRequestStatusFetch,
  wdRules,
  pathRuleEditCritera,
  pathRuleEditIsDirty,
  pathRuleEdit,
  pathRulesFetchStatus,
  pathRulesItems,
  pathRulesFetchError,
  pathRuleEditActions
} from 'appWords'
import { setStateValue } from 'features/helpers'

// eslint-disable-next-line
import { yellow, blue, red, purple, grpStart, grpEnd } from 'logger'
// eslint-disable-next-line
import { logFetchResults } from 'lib/logFetchResults'

/**
 * @name initialState
 * @type {object}
 * @see https://github.com/klequis/private-money-client/wiki/State for properties of ruleEdit which are created at runtime.
 */
const initialState = {
  items: [],
  create: {
    status: wdRequestStatusFetch,
    error: null
  },
  fetch: {
    status: wdRequestStatusFetch,
    error: null
  },
  update: {
    status: wdRequestStatusFetch,
    error: null
  },
  ruleEdit: {}
}

export const rulesFetch = createAsyncThunk('rules/get', async () => {
  return await api.rules.read()
})

export const ruleCreate = createAsyncThunk(
  'rules/rule-create',
  async (rule) => {
    purple('ruleCreate: rule', rule)
    const newRule = R.pipe(removeInactiveCriteria, removeTmpIdField)(rule)
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

const rulesSlice = createSlice({
  name: 'rules',
  initialState,
  reducers: {
    /**
     *
     * @param {object} state the rulesSlice
     * @param {object} action  an Action {payload: { ... }}
     * @returns {object} the new slice state
     */
    ruleEditActionUpdate(state, action) {
      const currState = current(state)
      const newAction = R.path(['payload', action])
      const newActionId = R.prop('_id', newAction)
      // console.log('state', currState)
      // console.log('state.ruleEdit.actions', currState.ruleEdit.actions)
      const currActions = selectRuleEditActions(state)
      // console.log('currActions', currActions)
      const idxOfActionToReplace = R.findIndex(R.propEq('_id', newActionId))(
        currActions
      )
      const newActions = R.update(idxOfActionToReplace, newAction, currActions)
      const newState = R.pipe(
        R.assocPath(pathRuleEditActions, newActions),
        R.assocPath(pathRuleEditIsDirty, true)
      )(currState)

      return newState
    },
    /**
     *
     * @param {object} state the rules slice
     * @returns {void} void
     */
    ruleEditClear(state) {
      state.ruleEdit = {}
    },
    /**
     *
     * @param {object} state the rulesSlice
     * @param {object} action a Criterion {payload: { ... }}
     * @returns {object} the new state
     */
    ruleEditCriterionUpdate(state, action) {
      const currState = current(state)
      const newCriterion = R.path(['payload'], action)
      const newCriterionId = R.prop('_id', newCriterion)
      const currCriteria = selectRuleEditCriteria(currState)
      const idxOfCriteriaToReplace = R.findIndex(
        R.propEq('_id', newCriterionId)
      )(currCriteria)
      const newCriteria = R.update(
        idxOfCriteriaToReplace,
        newCriterion,
        currCriteria
      )
      const newState = R.pipe(
        // R.assocPath(rulePaths.pathRuleEditCriteria, newCriteria),
        setStateValue(wdRules, pathRuleEditCritera, newCriteria, currState),
        // R.assocPath(rulePaths.pathRuleEditDirty, true)
        setStateValue(wdRules, pathRuleEditIsDirty, true, currState)
      )(currState)
      return newState
    },
    /**
     *
     * @param {object} state state
     * @param {object} action payload: { ruleId: ruleId: string }
     * @returns {object} the new state
     */
    ruleEditSetExistingRule(state, action) {
      const ruleId = R.path(['payload', 'ruleId'], action)
      const rule = getRule(ruleId, current(state))
      return setStateValue(wdRules, pathRuleEdit, rule, current(state))
    },
    /**
     *
     * @param {object} state state
     * @param {object} action an Action object {payload: { action: {...} }}
     * @returns {object} the new sate
     */
    ruleEditSetNewRule(state, action) {
      const { payload } = action
      const { origDescription, date } = payload
      const rule = ruleTmpMake(origDescription, date)
      return setStateValue(wdRules, pathRuleEdit, rule, current(state))
    },
    /**
     *
     * @param {object} state state
     * @returns {object} the new state
     */
    setRulesRefresh(state) {
      // state.rulesFetchStatus = wdRequestStatusFetch
      return setStateValue(
        wdRules,
        pathRulesFetchStatus,
        wdRequestStatusFetch,
        state
      )
    }
  },
  extraReducers: {
    // rulesFetch
    [rulesFetch.pending]: (state) => {
      // logFetchResults('fetchRules.pending', state, action)
      // state.rulesFetchStatus = wdRequestStatusPending
      // state.items = []
      return R.pipe(
        setStateValue(wdRules, pathRulesFetchStatus, wdRequestStatusPending),
        setStateValue(wdRules, pathRulesItems, [])
      )(current(state))
    },
    [rulesFetch.fulfilled]: (state, action) => {
      // logFetchResults('fetchRules.fulfilled', state, action)
      // state.rulesFetchStatus = wdRequestStatusFulfilled
      const newItems = R.path(['payload', 'data'], action)
      return R.pipe(
        setStateValue(wdRules, pathRulesFetchStatus, wdRequestStatusFulfilled),
        setStateValue(wdRules, pathRulesItems, newItems)
      )(current(state))
    },
    [rulesFetch.rejected]: (state, action) => {
      // logFetchResults('fetchRules.rejected', state, action)
      // state.rulesFetchStatus = wdRequestStatusError
      // state.error = R.path(['error', 'message'], action)
      // state.items = []

      const error = R.path(['error', 'message'], action)
      return R.pipe(
        setStateValue(wdRules, pathRulesFetchStatus, wdRequestStatusError),
        setStateValue(wdRules, pathRulesFetchError, error),
        setStateValue(wdRules, pathRulesItems, [])
      )(current(state))
    },
    // ruleCreate
    [ruleCreate.pending]: (state) => {
      // logFetchResults('ruleEdit.pending', state, action)
      state.ruleCreateStatus = wdRequestStatusPending
    },
    [ruleCreate.fulfilled]: (state) => {
      // logFetchResults('ruleEdit.fulfilled', state, action)
      state.ruleCreateStatus = wdRequestStatusFulfilled
    },
    [ruleCreate.rejected]: (state, action) => {
      // logFetchResults('ruleEdit.rejected', state, action)
      // red('ruleEdit.ruleCreate.srejected', 'rejected')
      state.ruleCreateStatus = wdRequestStatusError
      state.error = R.path(['error', 'message'], action)
    },
    // ruleUpdate
    [ruleUpdate.pending]: (state) => {
      // logFetchResults('ruleEdit.pending', state, action)
      state.ruleUpdateStatus = wdRequestStatusPending
    },
    [ruleUpdate.fulfilled]: (state) => {
      // logFetchResults('ruleEdit.fulfilled', state, action)
      state.ruleUpdateStatus = wdRequestStatusFulfilled
    },
    [ruleUpdate.rejected]: (state, action) => {
      // logFetchResults('ruleEdit.rejected', state, action)
      // red('ruleEdit.ruleUpdate.rejected', 'rejected')
      state.ruleUpdateStatus = wdRequestStatusError
      state.error = R.path(['error', 'message'], action)
    }

    // merged in /
  }
})

export const {
  ruleEditActionUpdate,
  ruleEditClear,
  ruleEditCriterionUpdate,
  ruleEditSetExistingRule,
  ruleEditSetNewRule,
  ruleEditTmpMake,
  setRulesRefresh
} = rulesSlice.actions

// export default rulesSlice.reducer
export const rulesReducer = rulesSlice.reducer
