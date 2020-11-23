import React from 'react'
import { requestStatusStates } from 'features/requestStatus'
import { isNilOrEmpty } from 'lib/isNilOrEmpty'

export const RenderWhenReady = ({ status, children }) => {

  // ! Component is dependent upon order of if statements ! //

  if (status === requestStatusStates.fulfilled) {
    return React.Children.only(children)
  }

  if (status === requestStatusStates.pending) {
    return <h1>Pending</h1>
  }

  if (status === requestStatusStates.error) {
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
