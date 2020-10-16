import * as R from 'ramda'

export const dataTypes = {
  String: 'String',
  Number: 'Number',
  Date: 'Date',
  Array: 'Array',
  Boolean: 'Boolean',
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





