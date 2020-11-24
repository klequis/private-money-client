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

export const requestStatusNames = {
  criteriaResultsFetchStatus: 'criteriaResultsFetchStatus',
  transactionsFetchStatus: 'transactionsFetchStatus',
  rulesFetchStatus: 'rulesFetchStatus',
  ruleCreateStatus: 'ruleCreateStatus',
  ruleUpdateStatus: 'ruleUpdateStatus'
}

export const requestStatusStates = {
  error: 'request-error',
  fulfilled: 'request-fulfilled',
  idle: 'idle',
  pending: 'request-pending',
  refresh: 'refresh'
}