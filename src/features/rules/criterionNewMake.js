import { makeTmpId } from 'lib/makeTmpId'
import { operatorFields } from 'features/rules'
import { txFields } from 'features/tx'
import {
  wdActive,
  wdField,
  wdOperator,
  wdValue,
  wdId
} from 'appWords'

/**
 * @returns {object} a Criterion with defaults
 */
export const criterionNewMake = () => {
  return {
    [wdId]: makeTmpId(),
    [wdField]: txFields.description.name,
    [wdOperator]: operatorFields.equals.name,
    [wdValue]: 'Description value',
    [wdActive]: true
  }
}
