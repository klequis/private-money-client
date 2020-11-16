import * as R from 'ramda'
import { isDate as dfnsIsDate } from 'date-fns'

export const dataTypes = {
  Array: 'Array',
  Boolean: 'Boolean',
  Date: 'Date',
  Null: 'Null',
  Number: 'Number',
  String: 'String',
  Undefined: 'Undefined',
}

/**
 * @param {any} value 
 * @returns {boolean}
 */
export const isArray = value => R.type(value) === dataTypes.Array

/**
 * @param {any} value 
 * @returns {boolean}
 */
export const isBoolean = value => R.type(value) === dataTypes.Boolean

/**
 * @param {any} value 
 * @returns {boolean}
 */
export const isDate = value => R.type(value) === dataTypes.Date

/**
 * @param {any} value 
 * @returns {boolean}
 */
export const isNumber = value => R.type(value) === dataTypes.Number

/**
 * @param {any} value 
 * @returns {boolean}
 */
export const isString = value => R.type(value) === dataTypes.String

/**
 * 
 * @param {any} value 
 * @returns {boolean}
 */
export const isStringDate = value => dfnsIsDate(new Date(value))

/**
 * @param {any} value 
 * @returns {boolean}
 */
export const isNull = value => R.type(value) === dataTypes.Null

/**
 * @param {any} value 
 * @returns {boolean}
 */
export const isUndefined = value => R.type(value) === dataTypes.Undefined





