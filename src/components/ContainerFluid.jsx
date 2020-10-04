import React from 'react'
import classNames from 'classnames'

const ContainerFluid = ({ id, children }) => {
    return (
        <div id={id} className="container-fluid">
            {children}
        </div>
    )
}

export default ContainerFluid
