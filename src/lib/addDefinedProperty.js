export const addDefinedProperty = (
  propName,
  propValue,
  obj,
  writable = true
) => {
  Object.defineProperty(obj, propName, {
    value: propValue,
    writable
  })
  return obj
}
