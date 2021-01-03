import React from 'react'
import { Trash } from 'react-bootstrap-icons'
import styled from 'styled-components'

const Btn = styled(Trash)`
  cursor: pointer
`

const DeleteButton = ({ id, onClick }) => {
    return (
        <>
            <Btn size={18} id={id} onClick={onClick} />
        </>
    )
}

export default DeleteButton
