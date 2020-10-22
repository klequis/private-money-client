import * as R from 'ramda'

export const actionTypes = {
  replaceAll: {
    name: 'replaceAll',
    description: 'Rename'
  },
  categorize: {
    name: 'categorize',
    description: 'Categorize'
  },
  strip: {
    name: 'strip',
    descrption: 'Strip'
  }
}

export const actionTypeSelectFields = R.values(actionTypes)

export const actionFields = {
  actionType: {
    name: 'actionType',
    description: 'Action Type'
  },
  field: {
    name: 'field',
    description: 'Field'
  },
  findValue: {
    name: 'findValue',
    description: 'Find value'
  },
  numAdditionalChars: {
    name: 'numAdditionalChars',
    description: 'Number additional characters'
  },
  replaceWithValue: {
    name: 'replaceWithValue',
    description: 'Replace with value'
  },
  category1: {
    name: 'category1',
    description: 'Category 2'
  },
  category2: {
    name: 'category2',
    description: 'Category 2'
  }
}
