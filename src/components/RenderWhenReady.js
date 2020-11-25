import React from 'react'
import { requestStatusStates } from 'globalConstants'
import { isNilOrEmpty } from 'lib/isNilOrEmpty'

export const RenderWhenReady = ({ status, children }) => {

  // ! Component is dependent upon order of if statements ! //

  const { fulfilled, pending, error, refresh } = requestStatusStates

  if (status === fulfilled) {
    return React.Children.only(children)
  }

  if (status === pending) {
    return <h1>Pending</h1>
  }

  if (status === error) {
    return <h1>Error</h1>
  }

  if (isNilOrEmpty(status)) {
    return <h1>status is empty string</h1>
  }

  if (status === refresh) {
    return <h1>Refreshing data</h1>
  }

  return <h1>I don't know that status ?</h1>
}
