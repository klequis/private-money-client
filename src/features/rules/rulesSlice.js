/**
 * @module rulesSlice.js
 */

import {
  createSlice,
  createAsyncThunk,
  current
} from '@reduxjs/toolkit'
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
  selectRuleEditCriteria,
  rulePaths
} from 'features/selectors'
import {
  wdRequestStatusError,
  wdRequestStatusFulfilled,
  wdRequestStatusPending,
  wdRequestStatusRefresh,
  wdItems,
  wdRulesFetchStatus,
  wdRuleCreateStatus,
  wdRuleUpdateStatus,
  wdError,
  wdRuleEdit
} from 'appWords'


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
  [wdItems]: [],
  [wdRulesFetchStatus]: wdRequestStatusRefresh,
  [wdRuleCreateStatus]: wdRequestStatusRefresh,
  [wdRuleUpdateStatus]: wdRequestStatusRefresh,
  [wdError]: null,
  [wdRuleEdit]: {
  }
}


export const rulesFetch = createAsyncThunk('rules/get', async () => {
  const r = await api.rules.read()
  return r
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
     * @param {object} action where action.payload is an action
     */
    ruleEditActionUpdate(state, action) {
      const currState = current(state)
      const newAction = R.path(['payload', action])
      const newActionId = R.prop('_id', newAction)
      // console.log('state', currState)
      // console.log('state.ruleEdit.actions', currState.ruleEdit.actions)
      const currActions = selectRuleEditActions(state)
      // console.log('currActions', currActions)
      const idxOfActionToReplace = R.findIndex(
        R.propEq('_id', newActionId)
      )(currActions)
      const newActions = R.update(
        idxOfActionToReplace, 
        newAction, 
        currActions
      )
      const newState = R.pipe(
        R.assocPath(rulePaths.ruleEditActions, newActions),
        R.assocPath(rulePaths.ruleEditIsDirty, true)
      )(currState)
      return newState
    },
    /**
     * 
     * @param {object} state 
     */
    ruleEditClear(state) {
      state.ruleEdit = {}
    },
    /**
     *
     * @param {object} state the rulesSlice
     * @param {object} action where action.payload is a criterion
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
        R.assocPath(rulePaths.pathRuleEditCriteria, newCriteria),
        R.assocPath(rulePaths.pathRuleEditDirty, true)
      )(currState)
      return newState
    },
    ruleEditSetExistingRule(state, action) {
      const ruleId = R.path(['payload', 'ruleId'], action)
      state.ruleEdit = getRule(ruleId, current(state))
    },
    ruleEditSetNewRule(state, action) {
      const { payload } = action
      const { origDescription, date } = payload
      state.ruleEdit = ruleTmpMake(origDescription, date)
    },
    ruleEditTmpMake(state, action) {
      const { payload } = action
      const { origDescription, date } = payload
      state.ruleEdit = ruleTmpMake(origDescription, date)
    },
    setRulesRefresh(state) {
      state.rulesFetchStatus = wdRequestStatusRefresh
    }
  },
  extraReducers: {
    // rulesFetch
    [rulesFetch.pending]: (state, action) => {
      // logFetchResults('fetchRules.pending', state, action)
      state.rulesFetchStatus = wdRequestStatusPending
      state.items = []
    },
    [rulesFetch.fulfilled]: (state, action) => {
      // logFetchResults('fetchRules.fulfilled', state, action)
      state.rulesFetchStatus = wdRequestStatusFulfilled
      state.items = R.path(['payload', 'data'], action)
    },
    [rulesFetch.rejected]: (state, action) => {
      // logFetchResults('fetchRules.rejected', state, action)
      state.rulesFetchStatus = wdRequestStatusError
      state.error = R.path(['error', 'message'], action)
      state.items = []
    },
    // ruleCreate
    [ruleCreate.pending]: (state, action) => {
      // logFetchResults('ruleEdit.pending', state, action)
      state.ruleCreateStatus = wdRequestStatusPending
    },
    [ruleCreate.fulfilled]: (state, action) => {
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
    [ruleUpdate.pending]: (state, action) => {
      // logFetchResults('ruleEdit.pending', state, action)
      state.ruleUpdateStatus = wdRequestStatusPending
    },
    [ruleUpdate.fulfilled]: (state, action) => {
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
