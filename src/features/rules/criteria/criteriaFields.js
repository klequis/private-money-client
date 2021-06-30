import * as R from 'ramda'
import { txFields } from 'features/tx'

// eslint-disable-next-line
import { green, redf, yellow, blue, purple } from 'logger'

/**
 * @returns {object}
 * @description List of fields appropriate for use with Critera
 */
export const criteriaFields = {
  select: txFields.select,
  acctId: txFields.acctId,
  amount: txFields.amount,
  date: txFields.date,
  description: txFields.description,
  type: txFields.type
}

/**
 * @returns {Array} criteria.fields as an array
 */
export const criteriaFieldList = R.values(criteriaFields)

/**
 * @returns {Array} A list containing the 'name' props from criteria.fields
 */
export const criteriaFieldNames = R.map((f) => f.name, criteriaFields)
