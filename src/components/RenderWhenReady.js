import React from 'react'
// import { requestStatusStates } from 'globalConstants'
import { isNilOrEmpty } from 'lib/isNilOrEmpty'
import {
  wdRequestStatusError,
  wdRequestStatusFulfilled,
  wdRequestStatusPending,
  wdRequestStatusFetch
} from 'appWords'
// eslint-disable-next-line
import { green } from 'logger'

export const RenderWhenReady = ({ status, children }) => {

  // ! Component is dependent upon order of if statements ! //


  if (status === wdRequestStatusFulfilled) {
    return React.Children.only(children)
  }

  if (status === wdRequestStatusPending) {
    return <h1>Pending</h1>
  }

  if (status === wdRequestStatusError) {
    return <h1>Error</h1>
  }

  if (isNilOrEmpty(status)) {
    return <h1>status is empty string</h1>
  }

  if (status === wdRequestStatusFetch) {
    return <h1>Refreshing data</h1>
  }

  return <h1>I don't know that status ?</h1>
}
