import { criteriaSelectFields, operatorSelectFields, actionTypeSelectFields} from 'globalConstants'
import * as R from ramda

const criteriaSelectFieldNames = R.map(f => f.name, criteriaSelectFields)

const operatorSelectFieldNames = R.map(f => f.name, operatorSelectFields)

const isCriterionFieldPropValueValid = (criterion) => {
  const { field } = criterion
  return R.includes(field, criteriaSelectFieldNames)
}

const isCriterionValuePropValueLongEnough = (criterion) => {
  const { value } = criterion
  return value.length > 2
}

const isCriterionOperationPropValueValid = (criterion) => {
  const { operation } = criterion
  return R.includes(operation, operatorSelectFieldNames)
}

const isCriterionActive = (criterion) => criterion.active

const criteriaCheck = (criteria) => {
  const a = activeCriteria.map((c) => {
    return R.all(x => x === true, [
      isCriterionFieldPropValueValid(c),
      isCriterionValuePropValueLongEnough(c),
      isCriterionOperationPropValueValid(c),
      isCriterionActive(c)
    ])
  })
  const b = R.all(x => x === true, a)

}


export default criteriaCheck

