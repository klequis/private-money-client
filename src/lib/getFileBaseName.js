export const getFileBaseName = (fullName) => {
  // console.log('fullName')
  const lastSlash = fullName.lastIndexOf('/')
  const lastDot = fullName.lastIndexOf('.')

  const name = fullName.slice(lastSlash + 1, lastDot)
  return name
}
