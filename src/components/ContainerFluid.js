import React from 'react'

const ContainerFluid = ({ id, children }) => {
    return (
        <div id={id} className="container-fluid">
            {children}
        </div>
    )
}

export default ContainerFluid
