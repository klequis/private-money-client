import {
  createSlice,
  createAsyncThunk,
  // eslint-disable-next-line
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
import { selectRuleEditCriteria, slicePaths } from 'features/selectors'
import { requestStatusNames, requestStatusStates } from 'globalConstants'

// eslint-disable-next-line
import { yellow, blue, red, purple, grpStart, grpEnd } from 'logger'
// eslint-disable-next-line
import { logFetchResults } from 'lib/logFetchResults'

const initialState = {
  items: [],
  [requestStatusNames.rulesFetchStatus]: requestStatusStates.refresh,
  [requestStatusNames.ruleCreateStatus]: requestStatusStates.refresh,
  [requestStatusNames.ruleUpdateStatus]: requestStatusStates.refresh,
  error: null,
  ruleEdit: {
    rule: {}
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
    ruleEditActionUpdate(state, action) {
      const newAction = action.payload
      const newActionId = R.prop('_id', newAction)
      const currActions = R.path([slicePaths.ruleEditActions], state)
      const idxOfActionToReplace = R.findIndex(
        R.propEq('_id', newActionId)
      )(currActions)
      const newActions = R.update(
        idxOfActionToReplace, 
        newAction, 
        currActions
      )
      // const newStateOld = R.assocPath(
      //   [slicePaths.ruleEditActions],
      //   newActions,
      //   state
      // )
      // newState.ruleEdit.dirty = true
      const newState = R.pipe(
        R.assocPath(slicePaths.ruleEditActions, newActions),
        R.assocPath(['ruleEdit', 'dirty'], true)
      )
      return newState
    },
    ruleEditClear(state, action) {
      state.ruleEdit = {}
    },
    /**
     *
     * @param {object} state the rulesSlice
     * @param {object} action where action.payload is a criterion
     */
    ruleEditCriterionUpdate(state, action) {
      const newCriterion = action.payload
      const newCriterionId = R.prop('_id', newCriterion)
      const currCriteria = selectRuleEditCriteria(current(state))
      const idxOfCriteriaToReplace = R.findIndex(
        R.propEq('_id', newCriterionId)
      )(currCriteria)
      const newCriteria = R.update(
        idxOfCriteriaToReplace,
        newCriterion,
        currCriteria
      )
      const newState = R.pipe(
        // R.assocPath(R.tail(selectorPaths.ruleEditCriteria), newCriteria),
        R.assocPath(slicePaths.ruleEditCriteria, newCriteria),
        R.assocPath(['ruleEdit', 'dirty'], true)
      )(current(state))
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
      state.rulesFetchStatus = requestStatusStates.refresh
    }
  },
  extraReducers: {
    [rulesFetch.pending]: (state, action) => {
      // logFetchResults('fetchRules.pending', state, action)
      state.rulesFetchStatus = requestStatusStates.pending
      state.items = []
    },
    [rulesFetch.fulfilled]: (state, action) => {
      // logFetchResults('fetchRules.fulfilled', state, action)
      state.rulesFetchStatus = requestStatusStates.fulfilled
      state.items = action.payload.data
    },
    [rulesFetch.rejected]: (state, action) => {
      // logFetchResults('fetchRules.rejected', state, action)
      state.rulesFetchStatus = requestStatusStates.error
      state.error = action.error.message
      state.items = []
    },
    // merged in

    [ruleCreate.pending]: (state, action) => {
      // logFetchResults('ruleEdit.pending', state, action)
      state.ruleCreateStatus = requestStatusStates.pending
    },
    [ruleCreate.fulfilled]: (state, action) => {
      // logFetchResults('ruleEdit.fulfilled', state, action)
      state.ruleCreateStatus = requestStatusStates.fulfilled
    },
    [ruleCreate.rejected]: (state, action) => {
      // logFetchResults('ruleEdit.rejected', state, action)
      // red('ruleEdit.ruleCreate.srejected', 'rejected')
      state.ruleCreateStatus = requestStatusStates.error
      state.error = action.error.message
    },
    // ruleUpdate
    [ruleUpdate.pending]: (state, action) => {
      // logFetchResults('ruleEdit.pending', state, action)
      state.ruleUpdateStatus = requestStatusStates.pending
    },
    [ruleUpdate.fulfilled]: (state, action) => {
      // logFetchResults('ruleEdit.fulfilled', state, action)
      state.ruleUpdateStatus = requestStatusStates.fulfilled
    },
    [ruleUpdate.rejected]: (state, action) => {
      // logFetchResults('ruleEdit.rejected', state, action)
      red('ruleEdit.ruleUpdate.rejected', 'rejected')
      state.ruleUpdateStatus = requestStatusStates.error
      state.error = action.error.message
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
