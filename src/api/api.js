import { fetchJson } from './apiHelpers'
// import { isEmpty } from 'validator'
// import * as R from 'ramda'

// eslint-disable-next-line
import { orange, green, redf } from 'logger'

/*
    [description] && [true || false]

    '' && true

    someVale && true

    '' && false

    someVale && false
*/

// Errors are handled by fetchJson()
export const api = {
  duplicates: {
    async read() {
      try {
        const url = '/api/duplicates'
        const data = await fetchJson(url, {
          method: 'GET'
        })
        // orange('api.duplicates.read: data', data)
        return data
      } catch (e) {
        redf('api.duplicates.read ERROR', e.message)
        console.log(e)
      }
    }
  },
  transactions: {
    async read(criteria) {
      // orange('transactions.read: criteria', criteria)
      try {
        const url = '/api/criteria/criteria-test/'
        const data = await fetchJson(url, {
          method: 'POST',
          body: JSON.stringify(criteria)
        })
        orange('transactions.read: data', data)
        return data
      } catch (e) {
        throw e
        // redf('api.transactions.read ERROR', e.message)
        // console.log(e)
      }
    }
  },
  rules: {
    async read() {
      try {
        const url = '/api/rules'
        const data = await fetchJson(url, {
          method: 'GET'
        })
        orange('api.rules.read: data', data)
        return data
      } catch (e) {
        throw e
        // redf('api.rules.read ERROR', e.message)
        // console.log(e)
      }
    },
    async rulesReadById(ruleId) {
      const url = `api/rules/${ruleId}`
      const data = await fetchJson(url, {
        method: 'GET'
      })
      return data
    },
    async create(rule) {
      orange('api.rules.create: rule', rule)
      const url = 'api/rules/new-rule'
      const data = await fetchJson(url, {
        method: 'POST',
        body: JSON.stringify(rule)
      })
      // orange('rules.create: data', data)
      return data
    },
    async delete(ruleId) {
      const url = `api/rules/ruleid/${ruleId}`
      const data = await fetchJson(url, {
        method: 'DELETE'
      })
      // orange('rules.delete: data', data)
      return data
    },
    async update(_id, rule) {
      orange('api.rules.update: _id', _id)
      const url = `api/rules/ruleid/${_id}`
      const data = await fetchJson(url, {
        method: 'PATCH',
        body: JSON.stringify(rule)
      })
      // orange('api.rules.update: data', data)
      return data
    }
  },
  views: {
    async read(viewUrlPart) {
      // orange('api.views.read: viewUrlPart', viewUrlPart)
      try {
        const url = `/api/views/${viewUrlPart}`
        // orange('api.views.read: url', url)
        const data = await fetchJson(url, {
          method: 'GET'
        })
        orange('api.views.read: data', data)
        return data
      } catch (e) {
        throw e
        // redf('api.transactions.views ERROR', e.message)
        // console.log(e)
      }
    }
  },
  async importData() {
    const data = await fetchJson('api/import', {
      method: 'GET'
    })
    // orange('importData: data', data)
    return data
  }
}