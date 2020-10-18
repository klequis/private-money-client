
import shortid from 'shortid'
import { 
  actionTypes, 
} from 'fields/actionFields'
import criteria from 'fields/criteria'
import { 
  transactionFields as tFields
} from 'fields/transactionFields'

// eslint-disable-next-line
import { green, redf, yellow, blue, purple } from 'logger'

export const ruleTmpMake = (tmpId, origDescription, date) => {
  const { operators: oFields } = criteria

  return {
    _id: tmpId,
    criteria: [
      {
        _id: `tmp_${shortid.generate()}`,
        field: tFields.description.name,
        operation: oFields.equals.name,
        value: origDescription,
        active: true,
      },
      {
        _id: `tmp_${shortid.generate()}`,
        field: tFields.date.name,
        operation: oFields.equals.name,
        value: date,
        active: false
      }
    ],
    actions: [
      {
        _id: `tmp_${shortid.generate()}`,
        actionType: actionTypes.replaceAll.name,
        field: tFields.description.name,
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