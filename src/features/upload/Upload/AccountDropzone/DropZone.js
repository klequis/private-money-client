import { useRef } from 'react'
import styled from 'styled-components'
import { Area } from 'components/Area'
import { CardTitle } from 'components/CardTitle'
import { CardText } from 'components/CardText'

const DropZoneDiv = styled.div`
  text-align: center;
  height: 150px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 20px 0;
  margin-bottom: 20px;
`

export const DropZone = ({ getRootProps, getInputProps, account }) => {
  const _dropRef = useRef()
  return (
    <Area bgColor="danger">
      <DropZoneDiv {...getRootProps()} ref={_dropRef}>
        <input {...getInputProps()} />
        <CardTitle>{account.acctName}</CardTitle>
        <CardText>Only CSV files are accepted.</CardText>
      </DropZoneDiv>
    </Area>
  )
}
