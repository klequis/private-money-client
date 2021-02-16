import React from 'react'

// eslint-disable-next-line
import { green } from 'logger'

const makeStyle = (align, color) => {
  return {
    color: color,
    textAlign: align
  }
}

export const TxTblData = ({ align, children, color }) => {
  return <td style={makeStyle(align, color)}>{children}</td>
}
