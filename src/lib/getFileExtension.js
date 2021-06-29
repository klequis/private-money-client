export const getFileExtension = (fullName) => {
  const len = fullName.length
  const lastDot = fullName.lastIndexOf('.')
  return fullName.slice(lastDot + 1, len)
}
