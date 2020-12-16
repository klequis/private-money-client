/**
 * @module rulesSlice.js
 */

import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit'
import { api } from 'api'
import * as R from 'ramda'
import { ruleTmpMake, defaultActions } from './ruleTmpMake'
import {
  getRule,
  removeInactiveCriteria,
  removeTmpIdField
} from 'features/helpers'
import {
  selectRuleEditActions,
  selectRuleEditCriteria,
  selectRuleEditId,
  selectRuleEditIsTmpRule,
  selectRuleEdit,
  selectActiveTxOrigDescription
} from 'features/selectors'
import {
  pathRuleEditCritera,
  pathRuleEditIsDirty,
  pathRuleEdit,
  pathRulesFetchStatus,
  pathRulesItems,
  pathRulesFetchError,
  wdRuleEdit,
  pathRuleEditActions,
  pathRuleEditIsTmpRule,
  wdRules,
  pathRulesCreateStatus,
  pathRulesCreateError,
  pathRulesUpdateStatus,
  pathRulesUpdateError,
  pathRuleEditHasActionTypeOmit,
  wdActions,
  wdActionType,
  wdOmit,
  wdRequestStatusError,
  wdRequestStatusFetch,
  wdRequestStatusFulfilled,
  wdRequestStatusPending
} from 'appWords'
import { setStateValue } from 'features/helpers'
import { dataTypes } from 'lib/dataTypes'
import { isTmpRule } from 'lib/isTmpRule'
import { txActiveIdClear, txFetchStatusSetRefresh } from 'features/tx'

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
  async (rule, thunkApi) => {
    try {
      const newRule = R.pipe(removeInactiveCriteria, removeTmpIdField)(rule)
      await api.rules.create(newRule)
      const { dispatch } = thunkApi
      dispatch(txFetchStatusSetRefresh())
      dispatch(rulesRefreshSet())
      dispatch(txActiveIdClear())
      dispatch(ruleEditClear())
    } catch (e) {
      red('ruleCreateError', e)
    }
  }
)

export const ruleEditSave = createAsyncThunk(
  'rules/rule-edit-save',
  async (noRulePassed, thunkApi) => {
    try {
      const { getState, dispatch } = thunkApi
      const state = getState()
      const rule = selectRuleEdit(state)
      const isTmp = selectRuleEditIsTmpRule(state)
      if (isTmp) {
        const newRule = R.pipe(removeInactiveCriteria, removeTmpIdField)(rule)
        await api.rules.create(newRule)
      } else {
        const newRule = removeInactiveCriteria(rule)
        await api.rules.update(rule._id, newRule)
      }
      dispatch(txFetchStatusSetRefresh())
      dispatch(rulesRefreshSet())
      dispatch(txActiveIdClear())
      dispatch(ruleEditClear())
    } catch (e) {
      red('ruleEditSave Error', e)
    }
  }
)

export const ruleUpdate = createAsyncThunk(
  'rules/rule-update',
  async (rule) => {
    const newRule = removeInactiveCriteria(rule)
    await api.rules.update(rule._id, newRule)
  }
)

const ruleEditSet = R.curry((value, state) => {
  return setStateValue(wdRules, pathRuleEdit, value, state)
})

const actionsSet = R.curry((newActions, state) => {
  return setStateValue(wdRules, pathRuleEditActions, newActions, state)
})

const criteriaSet = R.curry((newCriteria, state) => {
  return setStateValue(wdRules, pathRuleEditCritera, newCriteria, state)
})

const fetchStatusSet = R.curry((status, state) => {
  return setStateValue(wdRules, pathRulesFetchStatus, status, state)
})

const itemsSet = R.curry((items, state) => {
  return setStateValue(wdRules, pathRulesItems, items, state)
})

const fetchErrorSet = R.curry((errorMessage, state) => {
  return setStateValue(wdRules, pathRulesFetchError, errorMessage, state)
})

const createStatusFetchSet = R.curry((status, state) => {
  return setStateValue(wdRules, pathRulesCreateStatus, status, state)
})

const createStatusErrorSet = R.curry((errorMessage, state) => {
  return setStateValue(wdRules, pathRulesCreateError, errorMessage, state)
})

const updateStatusSet = R.curry((status, state) => {
  return setStateValue(wdRules, pathRulesUpdateStatus, status, state)
})

const updateErrorSet = R.curry((errorMessage, state) => {
  return setStateValue(wdRules, pathRulesUpdateError, errorMessage, state)
})

const isDirtySet = R.curry((value, state) => {
  return setStateValue(wdRules, pathRuleEditIsDirty, value, state)
})

const hasActionTypeOmitSet = R.curry((state) => {
  const actions = R.path([wdRuleEdit, wdActions], state)
  const hasOmit =
    R.find(R.propEq(wdActionType, wdOmit), actions) === undefined ? false : true
  return setStateValue(wdRules, pathRuleEditHasActionTypeOmit, hasOmit, state)
})

const isTmpRuleSet = R.curry((state) => {
  return setStateValue(
    wdRules,
    pathRuleEditIsTmpRule,
    isTmpRule(selectRuleEditId(state)),
    state
  )
})

const _log = (message) => (value) => console.log(message, value)

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
      const newActions =
        R.type(payload) === dataTypes.Array ? payload : [payload]
      const ret = R.pipe(
        actionsSet(newActions),
        isDirtySet(true),
        hasActionTypeOmitSet
      )(current(state))
      return ret
    },
    ruleEditSetDefaultActions(state, action) {
      const newActions = defaultActions(action.payload)
      return R.pipe(
        actionsSet(newActions),
        isDirtySet(true),
        hasActionTypeOmitSet
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
      return R.pipe(actionsSet(newActions), isDirtySet(true))(currState)
    },
    /**
     *
     * @param {object} state the rules slice
     * @returns {void} void
     */
    ruleEditClear(state) {
      return ruleEditSet({}, current(state))
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
      return R.pipe(criteriaSet(newCriteria), isDirtySet(true))(currState)
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
      return R.pipe(
        ruleEditSet(rule),
        hasActionTypeOmitSet,
        isDirtySet(false),
        isTmpRuleSet
      )(currState)
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
      blue('ruleEditSetNewRule: rule', rule)
      // new rule always has hasActionTypeOmit === false so
      // no need to set
      return R.pipe(
        ruleEditSet(rule),
        hasActionTypeOmitSet,
        isDirtySet(true),
        isTmpRuleSet
      )(current(state))
    },
    /**
     *
     * @param {object} state state
     * @returns {object} the new state
     */
    rulesRefreshSet(state) {
      return fetchStatusSet(wdRequestStatusFetch, current(state))
    }
  },
  extraReducers: {
    // rulesFetch
    [rulesFetch.pending]: (state) => {
      return R.pipe(
        fetchStatusSet(wdRequestStatusPending),
        itemsSet([])
      )(current(state))
    },
    [rulesFetch.fulfilled]: (state, action) => {
      const newItems = R.path(['payload', 'data'], action)
      return R.pipe(
        fetchStatusSet(wdRequestStatusFulfilled),
        itemsSet(newItems)
      )(current(state))
    },
    [rulesFetch.rejected]: (state, action) => {
      const error = R.path(['error', 'message'], action)
      return R.pipe(
        fetchStatusSet(wdRequestStatusError),
        fetchErrorSet(error),
        itemsSet([])
      )(current(state))
    },
    // ruleCreate
    [ruleCreate.pending]: (state) => {
      const currState = current(state)
      return createStatusFetchSet(wdRequestStatusPending, currState)
    },
    [ruleCreate.fulfilled]: (state) => {
      const currState = current(state)
      return createStatusFetchSet(wdRequestStatusFulfilled, currState)
    },
    [ruleCreate.rejected]: (state, action) => {
      const error = R.path(['error', 'message'], action)
      return R.pipe(
        createStatusFetchSet(wdRequestStatusError),
        createStatusErrorSet(error)
      )(current(state))
    },
    // ruleUpdate
    [ruleUpdate.pending]: (state) => {
      return updateStatusSet(wdRequestStatusPending, state)
    },
    [ruleUpdate.fulfilled]: (state) => {
      return updateStatusSet(wdRequestStatusFulfilled, state)
    },
    [ruleUpdate.rejected]: (state, action) => {
      const error = R.path(['error', 'message'], action)
      return R.pipe(
        updateStatusSet(wdRequestStatusError),
        updateErrorSet(error)
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
  ruleEditSetDefaultActions,
  ruleEditTmpMake,
  rulesRefreshSet
} = rulesSlice.actions

export const rulesReducer = rulesSlice.reducer
