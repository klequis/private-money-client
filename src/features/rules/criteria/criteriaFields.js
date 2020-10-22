import * as R from 'ramda'
import { transactionFields as tFields } from 'features/transactions'

// eslint-disable-next-line
import { green, redf, yellow, blue, purple } from 'logger'


/**
 * @returns {object}
 * @description List of fields appropriate for use with Critera
 * 
 */
export const criteriaFields = {
  acctId: tFields.acctId,
  amount: tFields.amount,
  date: tFields.date,
  description: tFields.description,
  type: tFields.type
}

/**
 * @returns {array} criteria.fields as an array
 */
export const criteriaFieldList = R.values(criteriaFields)

/**
 * @returns {array} A list containing the 'name' props from criteria.fields
 */
export const criteriaFieldNames = R.map(
  (f) => f.name,
  criteriaFields
)

