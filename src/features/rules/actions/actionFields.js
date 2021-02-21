import * as R from 'ramda'
import {
  wdOmit,
  wdReplaceAll,
  wdCategorize,
  wdStrip,
  wdActionType,
  wdFindValue,
  wdNumAdditionalChars,
  wdReplaceWithValue,
  wdCategory1,
  wdCategory2,
  wdField
} from 'appWords'

export const actionTypes = {
  replaceAll: {
    name: wdReplaceAll,
    description: 'Rename'
  },
  categorize: {
    name: wdCategorize,
    description: 'Categorize'
  },
  strip: {
    name: wdStrip,
    descrption: 'Strip'
  },
  omit: {
    name: wdOmit,
    description: 'Omit'
  }
}

export const actionTypeSelectFields = R.values(actionTypes)

export const actionFields = {
  actionType: {
    name: wdActionType,
    description: 'Action Type'
  },
  field: {
    name: wdField,
    description: 'Field'
  },
  findValue: {
    name: wdFindValue,
    description: 'Find value'
  },
  numAdditionalChars: {
    name: wdNumAdditionalChars,
    description: 'Number additional characters'
  },
  replaceWithValue: {
    name: wdReplaceWithValue,
    description: 'Replace with value'
  },
  category1: {
    name: wdCategory1,
    description: 'Category 1'
  },
  category2: {
    name: wdCategory2,
    description: 'Category 2'
  }
}
