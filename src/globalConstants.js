export const requestStatus = {
  error: 'request-error',
  fulfilled: 'request-fulfilled',
  idle: 'idle',
  pending: 'request-pending',
  refresh: 'refresh'
}

export const transactionOptionValues = {
  all: 'all',
  hasRule: 'hasRule',
  doesNotHaveRule: 'doesNotHaveRule',
  both: 'both',
  categorized: 'categorized',
  uncategorized: 'uncategorized'
}

export const transactionOptionNames = {
  ruleRadio: 'ruleRadio',
  categorizeRadio: 'categorizeRadio'
}

export const errorLevels = {
  errorLevelNone: {
    name: 'errorLevelNone',
    color: 'white',
    message: ''
  },
  errorLevelWarn: {
    name: 'errorLevelWarn',
    color: 'yellow',
    message: ''
  },
  errorLevelError: {
    name: 'errorLevelError',
    color: 'red',
    message: ''
  }
}
