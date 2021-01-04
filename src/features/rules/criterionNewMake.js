import { makeTmpId } from 'lib/makeTmpId'
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
    [wdField]: 'select',
    [wdOperator]: 'select',
    [wdValue]: '',
    [wdActive]: true
  }
}
