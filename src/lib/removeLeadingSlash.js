export const removeLeadingSlash = (str) => {
  return str.startsWith('/') ? str.substring(1, str.length) : str
}
