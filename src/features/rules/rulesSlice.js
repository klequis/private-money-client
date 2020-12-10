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
import {
  selectRuleEditActions,
  selectRuleEditCriteria
} from 'features/selectors'
import {
  wdRequestStatusError,
  wdRequestStatusFulfilled,
  wdRequestStatusPending,
  wdRequestStatusFetch,
  wdRuleEdit,
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
  pathRulesUpdateError,
  pathRuleEditHasActionTypeOmit
} from 'appWords'
import { setStateValue } from 'features/helpers'
import { dataTypes } from 'lib/dataTypes'
import { isTmpRule } from 'lib/isTmpRule'

/* eslint-disable */
import { yellow, blue, red, purple, grpStart, grpEnd } from 'logger'
import { logFetchResults } from 'lib/logFetchResults'
/* eslint-enable */

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
    const newRule = R.pipe(removeInactiveCriteria, removeTmpIdField)(rule)
    await api.rules.create(newRule)
  }
)
export const ruleUpdate = createAsyncThunk(
  'rules/rule-update',
  async (rule) => {
    const newRule = removeInactiveCriteria(rule)
    await api.rules.update(rule._id, newRule)
  }
)

const ruleHasActionTypeOmit = (rule) => {
  const { actions } = rule
  return R.find(R.propEq('action', 'omit'), actions) === undefined ? false : true
}

/**
 * @description used only when a rule is initially put into rules.ruleEdit
 * @summary Assumes state has ruleEdit
 */
const ruleMetaPropsAdd = R.curry((state) => {
  // hasActionTypeOmit: boolean,
  // isDirty: boolean,
  // isTmpRule: boolean,

  blue('state', state)
  const rule = R.path(['ruleEdit'], state)
  blue('rule', rule)
  const { _id } = rule

  const newRule = R.mergeRight(rule, {
    isDirty: false, 
    isTmpRule: isTmpRule(_id),
    hasActionTypeOmit: ruleHasActionTypeOmit(rule)
  })

  return R.assocPath([wdRuleEdit], newRule, state)

})

const ruleEditSet = R.curry((value, state) => {
  return setStateValue(wdRules, pathRuleEdit, value, state)
})

const ruleEditActionsSet = R.curry((newActions, state) => {
  return setStateValue(wdRules, pathRuleEditActions, newActions, state)
})

const ruleEditIsDirtySet = R.curry((value, state) => {
  return setStateValue(wdRules, pathRuleEditIsDirty, value, state)
})

const ruleEditCriteriaSet = R.curry((newCriteria, state) => {
  return setStateValue(wdRules, pathRuleEditCritera, newCriteria, state)
})

const rulesFetchStatusSet = R.curry((status, state) => {
  return setStateValue(wdRules, pathRulesFetchStatus, status, state)
})

const rulesItemsSet = R.curry((items, state) => {
  return setStateValue(wdRules, pathRulesItems, items, state)
})

const rulesFetchErrorSet = R.curry((errorMessage, state) => {
  return setStateValue(wdRules, pathRulesFetchError, errorMessage, state)
})

const rulesCreateStatusFetchSet = R.curry((status, state) => {
  return setStateValue(wdRules, pathRulesCreateStatus, status, state)
})

const rulesCreateStatusErrorSet = R.curry((errorMessage, state) => {
  return setStateValue(wdRules, pathRulesCreateError, errorMessage, state)
})

const rulesUpdateStatusSet = R.curry((status, state) => {
  return setStateValue(wdRules, pathRulesUpdateStatus, status, state)
})

const rulesUpdateErrorSet = R.curry((errorMessage, state) => {
  return setStateValue(wdRules, pathRulesUpdateError, errorMessage, state)
})

const rulesSlice = createSlice({
  name: wdRules,
  initialState,
  reducers: {

    /**
     * 
     * @param {object} state the rulesSlice
     * @param {object} action an Action {payload: { ... }}
     * @returns {object} the new state slice
     * @description deletes all existing Actions and sets ruleEdit.actions = action.payload
     */
    ruleEditActionsReplace(state, action) {
      const payload = R.path(['payload'], action)
      const newActions = R.type(payload) === dataTypes.Array
        ? payload
        : [payload]
      return R.pipe(
        ruleEditActionsSet(newActions),
        ruleEditIsDirtySet(true),
        ruleMetaPropsAdd
      )(current(state))
    },
    /**
     *
     * @param {object} state the rulesSlice
     * @param {object} action  an Action {payload: { ... }}
     * @returns {object} the new state slice
     * @description updates an existing action in ruleEdit.actions[]
     */
    ruleEditActionUpdate(state, action) {
      
      const currState = current(state)
      const newAction = R.path(['payload'], action)
      const newActionId = R.prop('_id', newAction)
      const currActions = selectRuleEditActions(currState)
      const idxOfActionToReplace = R.findIndex(R.propEq('_id', newActionId))()(
        currActions
      )
      const newActions = R.update(idxOfActionToReplace, newAction, currActions)
      return R.pipe(
        ruleEditActionsSet(newActions),
        ruleEditIsDirtySet(true),
        ruleMetaPropsAdd
      )(currState)
    },
    /**
     *
     * @param {object} state the rules slice
     * @returns {void} void
     */
    ruleEditClear(state) {
      return ruleEditSet([], current(state))
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
      // TODO: set omit action
      const currState = current(state)
      const ruleId = R.path(['payload', 'ruleId'], action)
      const rule = getRule(ruleId, currState)
      return R.pipe(
        ruleEditSet(rule),
        ruleMetaPropsAdd
      )(currState)
    },
    /**
     *
     * @param {object} state state
     * @param {object} action an Action object {payload: { action: {...} }}
     * @returns {object} the new sate
     */
    ruleEditSetNewRule(state, action) {
      // TODO: set omit action
      const { payload } = action
      const { origDescription, date } = payload
      const rule = ruleTmpMake(origDescription, date)
      // new rule always has hasActionTypeOmit === false so
      // no need to set
      return R.pipe(
        ruleEditSet(rule),
        ruleMetaPropsAdd
      )(current(state))
    },
    /**
     *
     * @param {object} state state
     * @returns {object} the new state
     */
    rulesRefreshSet(state) {
      return rulesFetchStatusSet(wdRequestStatusFetch, current(state))
    }
  },
  extraReducers: {
    // rulesFetch
    [rulesFetch.pending]: (state) => {
      return R.pipe(
        rulesFetchStatusSet(wdRequestStatusPending),
        rulesItemsSet([])
      )(current(state))
    },
    [rulesFetch.fulfilled]: (state, action) => {
      const newItems = R.path(['payload', 'data'], action)
      return R.pipe(
        rulesFetchStatusSet(wdRequestStatusFulfilled),
        rulesItemsSet(newItems)
      )(current(state))
    },
    [rulesFetch.rejected]: (state, action) => {
      const error = R.path(['error', 'message'], action)
      return R.pipe(
        rulesFetchStatusSet(wdRequestStatusError),
        rulesFetchErrorSet(error),
        rulesItemsSet([])
      )(current(state))
    },
    // ruleCreate
    [ruleCreate.pending]: (state) => {
      const currState = current(state)
      return rulesCreateStatusFetchSet(wdRequestStatusPending, currState)
    },
    [ruleCreate.fulfilled]: (state) => {
      const currState = current(state)
      return rulesCreateStatusFetchSet(wdRequestStatusFulfilled, currState)
    },
    [ruleCreate.rejected]: (state, action) => {
      const error = R.path(['error', 'message'], action)
      return R.pipe(
        rulesCreateStatusFetchSet(wdRequestStatusError),
        rulesCreateStatusErrorSet(error)
      )(current(state))
    },
    // ruleUpdate
    [ruleUpdate.pending]: (state) => {
      return rulesUpdateStatusSet(wdRequestStatusPending, state)
    },
    [ruleUpdate.fulfilled]: (state) => {
      return rulesUpdateStatusSet(wdRequestStatusFulfilled, state)
    },
    [ruleUpdate.rejected]: (state, action) => {
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
  ruleEditActionsReplace,
  ruleEditSetExistingRule,
  ruleEditSetNewRule,
  ruleEditTmpMake,
  rulesRefreshSet
} = rulesSlice.actions

export const rulesReducer = rulesSlice.reducer
