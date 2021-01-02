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
  // TODO: #39
  // return a Criterion with default values
  /*  hint
      See ruleTmpMake which could also be called ruleNewMake.
      It creates two default Criterion.
      Have .active === true
  */
  return {
    [wdId]: makeTmpId(),
    criteria: [
      {
        [wdId]: makeTmpId(),
        [wdField]: txFields.description.name,
        [wdOperator]: operatorFields.equals.name,
        [wdValue]: '',
        [wdActive]: true
      },
    ]
  }
}
