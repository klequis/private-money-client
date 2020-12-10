import { operatorFields } from 'features/rules'
import { 
  txFields
} from 'features/tx'
import { 
  actionTypes, 
} from 'features/rules'
import { makeTmpId } from 'lib/makeTmpId'

/**
 * 
 * @param {string} origDescription origDescription from active transaction
 * @param {Date} date date from active transaction
 * @returns {object} A new Rule
 */
export const ruleTmpMake = (origDescription, date) => {
  const id = makeTmpId()
  return {
    _id: id,
    criteria: [
      {
        _id: makeTmpId(),
        field: txFields.description.name,
        operation: operatorFields.equals.name,
        value: origDescription,
        active: true,
      },
      {
        _id: makeTmpId(),
        field: txFields.date.name,
        operation: operatorFields.equals.name,
        value: date,
        active: false
      }
    ],
    actions: [
      {
        _id: makeTmpId(),
        actionType: actionTypes.replaceAll.name,
        field: txFields.description.name,
        replaceWithValue: origDescription
      },
      {
        _id: makeTmpId(),
        actionType: actionTypes.categorize.name,
        category1: '',
        category2: '',
      }
    ],
  }
}