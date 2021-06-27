export const getFileExtension = (fullName) => {
  const len = fullName.length
  const lastDot = fullName.lastIndexOf('.')
  const extension = fullName.slice(lastDot + 1, len)
  return extension
}
