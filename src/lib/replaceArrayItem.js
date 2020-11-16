import { update } from 'ramda'

export const replaceArrayItem = (array, itemToReplace, newItem) => {
  const idx = array.findIndex(itemToReplace)
  const a = update(idx, newItem, array)
  return a
}
