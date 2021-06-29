export const getFileBaseName = (fullName) => {
  const lastSlash = fullName.lastIndexOf('/')
  const lastDot = fullName.lastIndexOf('.')
  return fullName.slice(lastSlash + 1, lastDot)
}
