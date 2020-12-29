import { operatorFields } from 'features/rules'
import { txFields } from 'features/tx'
import { actionTypes } from 'features/rules'
import { makeTmpId } from 'lib/makeTmpId'
import {
  wdActionType,
  wdActive,
  wdCategory1,
  wdCategory2,
  wdField,
  wdId,
  wdOperator,
  wdReplaceWithValue,
  wdValue
} from 'appWords'

export const defaultActions = (origDescription) => {
  return [
    {
      [wdId]: makeTmpId(),
      [wdActionType]: actionTypes.replaceAll.name,
      [wdField]: txFields.description.name,
      [wdReplaceWithValue]: origDescription
    },
    {
      [wdId]: makeTmpId(),
      [wdActionType]: actionTypes.categorize.name,
      [wdCategory1]: '',
      [wdCategory2]: ''
    }
  ]
}
/**
 *
 * @param {string} origDescription origDescription from active transaction
 * @param {Date} date date from active transaction
 * @returns {object} A new Rule
 */
export const ruleTmpMake = (origDescription, date) => {
  const id = makeTmpId()
  return {
    [wdId]: id,
    criteria: [
      {
        [wdId]: makeTmpId(),
        [wdField]: txFields.description.name,
        [wdOperator]: operatorFields.equals.name,
        [wdValue]: origDescription,
        [wdActive]: true
      },
      {
        [wdId]: makeTmpId(),
        [wdField]: txFields.date.name,
        [wdOperator]: operatorFields.equals.name,
        [wdValue]: date,
        [wdActive]: false
      }
    ],
    actions: defaultActions(origDescription)
  }
}
