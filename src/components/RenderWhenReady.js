// import { requestStatusStates } from 'globalConstants'
import React from 'react'
import { isNilOrEmpty } from 'lib/isNilOrEmpty'
import {
  wdRequestStatusError,
  wdRequestStatusFulfilled,
  wdRequestStatusPending,
  wdRequestStatusFetch
} from 'appWords'
// eslint-disable-next-line
import { green, yellow } from 'logger'

export const RenderWhenReady = ({ status, children }) => {
  // ! Component is dependent upon order of if statements ! //

  if (status === wdRequestStatusFulfilled) {
    // yellow('RenderWhenReady', wdRequestStatusFulfilled)
    return React.Children.only(children)
  }

  if (status === wdRequestStatusPending) {
    // yellow('RenderWhenReady', wdRequestStatusPending)
    return <h1>Pending</h1>
  }

  if (status === wdRequestStatusError) {
    // yellow('RenderWhenReady', wdRequestStatusError)
    return <h1>Error</h1>
  }

  if (isNilOrEmpty(status)) {
    // yellow('RenderWhenReady', 'status is empty string')
    return <h1>status is empty string</h1>
  }

  if (status === wdRequestStatusFetch) {
    // yellow('RenderWhenReady', wdRequestStatusFetch)
    return <h1>Refreshing data</h1>
  }
  // yellow('RenderWhenReady', 'I do no know that status ?')
  return <h1>I don't know that status ?</h1>
}
