
import shortid from 'shortid'
import { 
  actionTypes, 
} from 'fields/actionFields'
import criteria from 'fields/criteria'
import { 
  transactionFields as fields
} from 'fields/transactionFields'

// eslint-disable-next-line
import { green, redf, yellow, blue, purple } from 'logger'

export const ruleTmpMake = (tmpId, origDescription, date) => {
  const { operatorFields: oFields } = criteria

  green('oFields', oFields)
  return {
    _id: tmpId,
    criteria: [
      {
        _id: `tmp_${shortid.generate()}`,
        field: oFields.description.name,
        operation: oFields.equals.name,
        value: origDescription,
        active: true,
      },
      {
        _id: `tmp_${shortid.generate()}`,
        field: oFields.date.name,
        operation: oFields.equals.name,
        value: date,
        active: false
      }
    ],
    actions: [
      {
        _id: `tmp_${shortid.generate()}`,
        actionType: actionTypes.replaceAll.name,
        field: oFields.description.name,
        replaceWithValue: origDescription
      },
      {
        _id: `tmp_${shortid.generate()}`,
        actionType: actionTypes.categorize.name,
        category1: '',
        category2: '',
      }
    ]
  }
}