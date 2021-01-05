import { makeTmpId } from 'lib/makeTmpId'
import {
  wdActive,
  wdField,
  wdOperator,
  wdValue,
  wdId,
  wdSelect,
  wdFeildsComplete
} from 'appWords'

/**
 * @returns {object} a Criterion with defaults
 */
export const criterionNewMake = () => {
  return {
    [wdId]: makeTmpId(),
    [wdField]: wdSelect,
    [wdOperator]: wdSelect,
    [wdValue]: '',
    [wdActive]: true,
    [wdFeildsComplete]: false,
  }
}
