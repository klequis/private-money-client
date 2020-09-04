import { update } from 'ramda'

const replaceArrayItem = (array, itemToReplace, newItem) => {
  const idx = array.findIndex(itemToReplace)
  const a = update(idx, newItem, array)
  return a
}

export default replaceArrayItem