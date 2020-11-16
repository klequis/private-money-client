import React from 'react'

export const ContainerFluid = ({ id, children }) => {
  return (
    <div id={id} className="container-fluid">
      {children}
    </div>
  )
}
