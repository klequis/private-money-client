import React from 'react'
import { requestStatus } from 'globalConstants'
import { isNilOrEmpty } from 'lib/isNilOrEmpty'

// import { yellow } from 'logger'

export const RequestStatus = ({ status, children }) => {
  // yellow('RequestStatus: status', status)
  // yellow('RequestStatus: children', children)

  if (status === requestStatus.fulfilled) {
    return React.Children.only(children)
  }

  if (status === requestStatus.pending) {
    return <h1>Pending</h1>
  }

  if (status === requestStatus.error) {
    return <h1>Error</h1>
  }

  if (isNilOrEmpty(status)) {
    return <h1>status is empty string</h1>
  }

  if (status === 'idle') {
    return <h1>status is idle</h1>
  }

  return <h1>I don't know that status ?</h1>
}
