import React from 'react'
import classNames from 'classnames'

export const Table = ({ children }) => {
    return (
        <table className={classNames('table', 'table-hover', 'table-dark', 'table-sm' )}>
            {children}
        </table>
    )
}
