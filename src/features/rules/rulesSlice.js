import { 
  createSlice, 
  createAsyncThunk, 
  // eslint-disable-next-line  
  current
} from '@reduxjs/toolkit'
import { api } from 'api'
import { requestStatusStates } from 'features/requestStatus'
import * as R from 'ramda'
import { ruleTmpMake } from './ruleTmpMake'
import { isNilOrEmpty } from 'lib/isNilOrEmpty'
// eslint-disable-next-line
import { blue, red, purple } from 'logger'
// eslint-disable-next-line
import { logFetchResults } from 'lib/logFetchResults'

const initialState = {
  items: [],
  rulesFetchStatus: requestStatusStates.idle,
  ruleCreateStatus: requestStatusStates.idle,
  ruleUpdateStatus: requestStatusStates.idle,
  error: null,
  ruleEdit: {
    dirty: false,
    rule: {}
  }
}

const getActiveCriteria = (criteria) => {
  return criteria === null ? [] : criteria.filter((c) => c.active === true)
}

const removeInactiveCriteria = (rule) => {
  const { criteria } = rule
  const activeCriteria = getActiveCriteria(criteria)
  return R.mergeRight(rule, { criteria: activeCriteria })
}

const removeTmpIdField = (rule) => {
  return R.has('_id') ? R.dissoc('_id', rule) : rule
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
    ruleSave(state, action) {},
    ruleEditSetExistingRule(state, action) {
      const { payload } = action
      state.ruleEdit = payload
    },
    ruleEditSetNewRule(state, action) {
      const { payload } = action
      const { origDescription, date } = payload
      state.ruleEdit = ruleTmpMake(origDescription, date)
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
      const newActionId = R.prop('_id', newAction)
      const idx = R.findIndex(R.propEq('_id', newActionId))(actions)
      const newActions = R.update(idx, newAction, actions)
      const newState = R.assocPath(['ruleEdit', 'actions'], newActions, state)
      newState.dirty = true
      return newState
    },
    // TODO: is this needed?
    ruleEditSave(state, action) {
      // if tmpRuleId -> remove the _id field and call insert
      // else call update
    },
    ruleEditTmpMake(state, action) {
      blue('state', current(state))
      const { payload } = action
      const { origDescription, date } = payload
      state.ruleEdit = ruleTmpMake(origDescription, date)
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
  ruleEditTmpMake
} = rulesSlice.actions

// export default rulesSlice.reducer
export const rulesReducer = rulesSlice.reducer

const getRulesItems = (state) =>
  R.has('rules')(state) ? state.rules.items : R.path(['state', 'items'], state)

const getRule = (ruleId, state) =>
  getRulesItems(state).find((r) => r._id === ruleId)

export const selectRulesStatus = (state) =>
  R.path(['state', 'transactions', 'status'], state)

export const selectRulesError = (state) =>
  R.path(['state', 'transactions', 'error'], state)

export const selectRuleCriteria = (ruleId, state) => {
  const { criteria } = getRule(ruleId, state)
  return criteria
}

export const selectRuleActions = (ruleId, state) => {
  const { actions } = getRule(ruleId, state)
  return actions
}

export const selectRule = (ruleId, state) =>
  R.find(R.propEq('_id', ruleId))(R.path(['rules', 'items'], state))

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
 * 
 */
export const selectRuleEditActions = (state) => {
  const actions = R.path(['ruleEdit', 'ruleEdit', 'actions'], state)
  return R.isNil(actions) ? [] : actions
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

export const selectRuleEditRenameDescriptionAction = (state) => {
  // blue('state', state)
  const actions = R.path(['ruleEdit', 'ruleEdit', 'actions'], state)
  // blue('actions', actions)
  if (isNilOrEmpty(actions)) {
    return null
  }
  const action = R.find(R.propEq('field', 'description'), actions)
  // blue('action', action)
  return action
}