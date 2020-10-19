import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit'
import * as R from 'ramda'
import { Promise } from "bluebird"
import { transactionsFetch } from 'features/transactions/transactionsSlice'
import { rulesFetch } from 'features/rules/rulesSlice'

// eslint-disable-next-line
import { blue } from 'logger'
import api from 'api'

const getActiveCriteria = (criteria) =>
  criteria === null ? [] : criteria.filter((c) => c.active === true)

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
    // blue('ruleCreate: rule', rule)
    const newRule = R.pipe(
      removeInactiveCriteria,
      removeTmpIdField
    )(rule)

    // blue('ruleCreate: newRule', newRule)

    // api.rules.create(newRule).then(() => Promise.all([
    //   transactionsFetch(),
    //   rulesFetch()
    // ]))

    // const x = await api.rules.create(newRule).then(result => {
    //   console.log('result', result)
    //   transactionsFetch()
    // })
    
    const x = await api.rules.create(newRule)  // .then(() => transactionsFetch())
    blue('x', x)
  }
)

export const ruleUpdate = createAsyncThunk(
  'rules/rule-update',
  async (rule) => {
    // blue('updateRule: rule', rule)
    const r = await api.rules.update(rule._id, rule)
  }
)

const initialState = {}

const ruleEditSlice = createSlice({
  name: 'ruleEdit',
  initialState,
  reducers: {
    ruleEditSet(state, action) {
      const { payload } = action
      state.ruleEdit = payload // || {}
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
    }
  }
})

export default ruleEditSlice.reducer

export const {
  ruleEditSet,
  ruleEditCriterionUpdate,
  ruleEditActionUpdate
} = ruleEditSlice.actions

// const hasRuleEdit = state => !(R.path(['state', 'ruleEdit']) === null)
export const selectRuleEdit = (state) => R.path(['ruleEdit', 'ruleEdit',], state)

export const selectRuleEditCriteria = (state) => {
  return R.path(['ruleEdit', 'ruleEdit', 'criteria'], state) || []
}

export const selectRuleEditActions = (state) => {
  return R.path(['ruleEdit', 'ruleEdit', 'actions'], state) || null
}

export const selectRuleEditId = (state) => {
  return R.path(['ruleEdit', 'ruleEdit', '_id'], state)
}