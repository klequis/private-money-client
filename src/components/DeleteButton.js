import React from 'react'
import { Trash } from 'react-bootstrap-icons'
import styled from 'styled-components'

const DeleteButtonDiv = styled.div`
  cursor: pointer;
`

const DeleteButtonIcon = styled(Trash)`
  pointer-events: none;
`

const DeleteButton = ({ id, onClick }) => {
  return (
    <DeleteButtonDiv id={id} onClick={onClick}>
      <DeleteButtonIcon />
    </DeleteButtonDiv>
  )
}

export default DeleteButton
