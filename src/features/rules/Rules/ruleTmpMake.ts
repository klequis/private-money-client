
import shortid from 'shortid'
import { 
  operators, 
  actionTypes, 
  transactionFields as fields
} from 'globalConstants'

// eslint-disable-next-line
import { green, redf, yellow, blue, purple } from 'logger'

export const ruleTmpMake = (tmpId: string, origDescription: string, date?: string) => {
  return {
    _id: tmpId,
    criteria: [
      {
        _id: `tmp_${shortid.generate()}`,
        field: fields.description.name,
        operation: operators.equals.name,
        value: origDescription,
        active: true,
      },
      {
        _id: `tmp_${shortid.generate()}`,
        field: fields.date.name,
        operation: operators.equals.name,
        value: date,
        active: false
      }
    ],
    actions: [
      {
        _id: `tmp_${shortid.generate()}`,
        actionType: actionTypes.replaceAll.name,
        field: fields.description.name,
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