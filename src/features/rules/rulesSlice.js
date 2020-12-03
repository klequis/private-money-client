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
  pathRuleEditActions,
  pathRulesCreateStatus,
  pathRulesCreateError,
  pathRulesUpdateStatus,
  pathRulesUpdateError
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

const ruleEditSet = (value) => (state) =>
  setStateValue(wdRules, pathRuleEdit, value, current(state))

// R.assocPath(pathRuleEditActions, newActions),
const ruleEditActionsSet = (newActions) => (state) =>
  setStateValue(wdRules, pathRuleEditActions, newActions, state)

// R.assocPath(pathRuleEditIsDirty, true)
const ruleEditIsDirtySet = (value) => (state) =>
  setStateValue(wdRules, pathRuleEditIsDirty, value, state)

// setStateValue(wdRules, pathRuleEditCritera, newCriteria, currState),
const ruleEditCriteriaSet = (newCriteria) => (state) =>
  setStateValue(wdRules, pathRuleEditCritera, newCriteria, state)

const rulesFetchStatusSet = (status) => (state) =>
  setStateValue(wdRules, pathRulesFetchStatus, status, state)

// setStateValue(wdRules, pathRulesItems, [])
const rulesItemsSet = (items) => (state) =>
  setStateValue(wdRules, pathRulesItems, items, state)

const rulesFetchErrorSet = (errorMessage) => (state) =>
  setStateValue(wdRules, pathRulesFetchError, errorMessage, state)

const rulesCreateStatusFetchSet = (status) => (state) =>
  setStateValue(wdRules, pathRulesCreateStatus, status, state)

const rulesCreateStatusErrorSet = (errorMessage) => (state) =>
  setStateValue(wdRules, pathRulesCreateError, errorMessage, state)

const rulesUpdateStatusSet = (status) => (state) =>
  setStateValue(wdRules, pathRulesUpdateStatus, status, state)

const rulesUpdateErrorSet = (errorMessage) => (state) =>
  setStateValue(wdRules, pathRulesUpdateError, errorMessage, state)

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
      const currActions = selectRuleEditActions(state)
      const idxOfActionToReplace = R.findIndex(R.propEq('_id', newActionId))(
        currActions
      )
      const newActions = R.update(idxOfActionToReplace, newAction, currActions)
      return R.pipe(
        // R.assocPath(pathRuleEditActions, newActions),
        ruleEditActionsSet(newActions),
        ruleEditIsDirtySet(true)
      )(currState)
    },
    /**
     *
     * @param {object} state the rules slice
     * @returns {void} void
     */
    ruleEditClear(state) {
      // setStateValue(wdRules, pathRuleEdit, {}, current(state))
      const currState = current(state)
      return ruleEditSet([], currState)
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
      return R.pipe(
        ruleEditCriteriaSet(newCriteria),
        ruleEditIsDirtySet(true)
      )(currState)
    },
    /**
     *
     * @param {object} state state
     * @param {object} action payload: { ruleId: ruleId: string }
     * @returns {object} the new state
     */
    ruleEditSetExistingRule(state, action) {
      const currState = current(state)
      const ruleId = R.path(['payload', 'ruleId'], action)
      const rule = getRule(ruleId, currState)
      // return setStateValue(wdRules, pathRuleEdit, rule, current(state))
      return ruleEditSet(rule, currState)
    },
    /**
     *
     * @param {object} state state
     * @param {object} action an Action object {payload: { action: {...} }}
     * @returns {object} the new sate
     */
    ruleEditSetNewRule(state, action) {
      const currState = current(state)
      const { payload } = action
      const { origDescription, date } = payload

      const rule = ruleTmpMake(origDescription, date)
      return ruleEditSet(rule, currState)
    },
    /**
     *
     * @param {object} state state
     * @returns {object} the new state
     */
    setRulesRefresh(state) {
      const currState = current(state)
      return rulesFetchStatusSet(wdRequestStatusFetch, currState)
    }
  },
  extraReducers: {
    // rulesFetch
    [rulesFetch.pending]: (state) => {
      // logFetchResults('fetchRules.pending', state, action)
      return R.pipe(
        rulesFetchStatusSet(wdRequestStatusPending),
        rulesItemsSet([])
      )(current(state))
    },
    [rulesFetch.fulfilled]: (state, action) => {
      // logFetchResults('fetchRules.fulfilled', state, action)
      const newItems = R.path(['payload', 'data'], action)
      return R.pipe(
        rulesFetchStatusSet(wdRequestStatusFulfilled),
        rulesItemsSet(newItems)
      )(current(state))
    },
    [rulesFetch.rejected]: (state, action) => {
      // logFetchResults('fetchRules.rejected', state, action)
      const error = R.path(['error', 'message'], action)
      return R.pipe(
        rulesFetchStatusSet(wdRequestStatusError),
        rulesFetchErrorSet(error),
        rulesItemsSet([])
      )(current(state))
    },
    // ruleCreate
    [ruleCreate.pending]: (state) => {
      // logFetchResults('ruleEdit.pending', state, action)
      const currState = current(state)
      return rulesCreateStatusFetchSet(wdRequestStatusPending, currState)
    },
    [ruleCreate.fulfilled]: (state) => {
      // logFetchResults('ruleEdit.fulfilled', state, action)
      const currState = current(state)
      return rulesCreateStatusFetchSet(wdRequestStatusFulfilled, currState)
    },
    [ruleCreate.rejected]: (state, action) => {
      // logFetchResults('ruleEdit.rejected', state, action)
      const error = R.path(['error', 'message'], action)
      return R.pipe(
        rulesCreateStatusFetchSet(wdRequestStatusError),
        rulesCreateStatusErrorSet(error)
      )(current(state))
    },
    // ruleUpdate
    [ruleUpdate.pending]: (state) => {
      // logFetchResults('ruleEdit.pending', state, action)
      return rulesUpdateStatusSet(wdRequestStatusPending, state)
    },
    [ruleUpdate.fulfilled]: (state) => {
      // logFetchResults('ruleEdit.fulfilled', state, action)
      return rulesUpdateStatusSet(wdRequestStatusFulfilled, state)
    },
    [ruleUpdate.rejected]: (state, action) => {
      // logFetchResults('ruleEdit.rejected', state, action)

      const error = R.path(['error', 'message'], action)
      return R.pipe(
        rulesUpdateStatusSet(wdRequestStatusError),
        rulesUpdateErrorSet(error)
      )(current(state))
    }
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

export const rulesReducer = rulesSlice.reducer
