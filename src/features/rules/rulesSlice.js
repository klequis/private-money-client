import { createSlice, createAsyncThunk /*, current*/ } from '@reduxjs/toolkit'
import api from 'api'
import { requestStatus } from 'globalConstants'
// import shortid from 'shortid'
// import isTmpRule from 'lib/isTmpRule'
import * as R from 'ramda'

// eslint-disable-next-line
import { blue, red } from 'logger'

const initialState = {
  items: [],
  status: 'idle',
  error: null,
  ruleEditId: null,
  ruleEdit: {},
  isEditMode: false
}

export const fetchRules = createAsyncThunk('rules/get', async () => {
  const r = await api.rules.read()
  return r
})

// const getRuleEditCriterion = (id, state) => {
//   const { ruleEdit } = state
//   const { criteria } = ruleEdit
//   return R.find(R.propEq('_id', id))(criteria)
// }

const replaceObjectInList = (newObject, list) => {
  // R.insert(2, 'x', [1,2,3,4]); //=> [1,2,'x',3,4]
  // R.without([1, 2], [1, 2, 1, 3, 4]); //=> [3, 4]
  // const xs = [{ a: 1 }, { a: 2 }, { a: 3 }]
  // R.findIndex(R.propEq('a', 2))(xs) //=> 1
  
  const { _id } = newObject
  // 1. find the index of the item to remove
  const idx = R.findIndex(R.propEq('_id', _id))(list)
  // 2. remove it
  const wo = R.without([idx], list)
  // 3. insert the new item at index
  const newCriteria = R.insert(idx, newObject, wo)
  return newCriteria
}

/*
    Scenarios
    1. existing rule[s]
    2. no rules
       - create a tmp rule
       - create an additional tmp rule - future?
         - in the event that a second tmp rule is needed
           a merge will be done (not implemented)
*/

const rulesSlice = createSlice({
  name: 'rules',
  initialState,
  reducers: {
    // payload will be a rule as Object either existing or tmp

    setRuleEdit(state, action) {
      // blue('SET RULE EDIT')
      const { payload } = action
      // blue('setRuleEdit: payload', payload)
      state.ruleEdit = payload || {}
      state.ruleEditId = payload._id
    },
    updateRuleEditCriterion(state, action) {
      const newCriterion = action.payload
      // const { payload: x } = action.payload
      // const { ruleEdit } = state
      // const { criteria } = ruleEdit
      // const criterion = R.find(R.propEq('_id', _id))(criteria)
      // const newCriterion = R.mergeRight(criterion, action.payload)


      //
      replaceObjectInList(newCriterion, action.payload)
    }
  },
  extraReducers: {
    [fetchRules.pending]: (state, action) => {
      state.status = requestStatus.pending
    },
    [fetchRules.fulfilled]: (state, action) => {
      state.status = requestStatus.fulfilled
      state.items = action.payload
    },
    [fetchRules.rejected]: (state, action) => {
      state.status = requestStatus.pending
      state.error = action.payload
    }
  }
})

export default rulesSlice.reducer

export const { setRuleEdit, updateRuleEditCriterion } = rulesSlice.actions

// is edit mode active
// const selectIsRuleEditMode = (state) => state.rules.ruleEditId !== null

// what is the _id of the rule being edited
export const ruleEditId = (state) => state.rules.ruleEdit._id

// set this rule as ruleEdit
export const selectRuleEdit = (state) => state.rules.ruleEdit

// select the criteria for ruleEdit
export const selectRuleEditCriteria = (state) => {
  // blue('state.rules.RuleEdit.criteria', state)

  return state.rules.ruleEdit.criteria
}

// select the actions for ruleEdit
export const selectRuleEditActions = (state) => {
  // blue('state.rules.RuleEdit.actions', state)
  return state.rules.ruleEdit.actions
}


// const rules = (state) => state.rules.items

// const getRuleIds = (transactionId, state) => {
//   return { ruleIds } = transactions(state).find((t) => t._id === transactionId)
// }

// const getRulesForTransaction = (transactionId, state) => {
//   const ruleIds = getRuleIds(transactionId, state)
//   const matchedRules = R.filter((rule) => R.includes(rule._id, ruleIds), rules(state))
// }

// export const selectCriteria = (transactionId, state) => {
//   return matchedRules.map((r) => {
//     return r.criteria
//   })
// }

// export const selectActions = (transactionId, state) => {
//   const ruleIds = getRuleIds(transactionId, state)

//   const matchedRules = R.filter((rule) => R.includes(rule._id, ruleIds), rules(state))

//   return matchedRules.map((r) => {
//     return r.actions
//   })
// }

const getRulesItems = (state) =>
  R.has('rules')(state) ? state.rules.items : state.items

const getRule = (ruleId, state) =>
  getRulesItems(state).find((r) => r._id === ruleId)

// const getRules = (ruleIds, state) =>
//   state.rules.items.filter((r) => ruleIds.includes(r._id))

export const selectRulesStatus = (state) => state.transactions.status
export const selectRulesError = (state) => state.transactions.error

export const selectRuleCriteria = (ruleId, state) => {
  const { criteria } = getRule(ruleId, state)
  return criteria
}

export const selectRuleActions = (ruleId, state) => {
  const { actions } = getRule(ruleId, state)
  return actions
}

export const selectOneRule = (ruleId, state) =>
  R.find(R.propEq('_id', ruleId))(state.rules.items)

