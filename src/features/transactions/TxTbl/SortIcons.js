import React, { useState } from 'react'
import styled from 'styled-components'
import { SortAscTriangle } from 'components/SortAscTriangle'
import { SortDescTriangle } from 'components/SortDescTriangle'
import { wdAsc, wdDesc, wdNone } from 'appWords'
// eslint-disable-next-line
import { green, purple, grpStart, grpEnd } from 'logger'

const SpacerDiv = styled.div`
  height: 1px;
`

const SortIconDiv = styled.div`
  display: flex;
  flex-direction: column;
`

const _activeColor = 'red'
const _inactiveColor = 'gray'

export const SortIcons = ({ fieldName, onChange }) => {
  const [_currentOrder, _setCurrentOrder] = useState(wdNone)

  const _click = (fieldName) => {
    green('fieldName', fieldName)

    if (_currentOrder === wdNone) {
      _setCurrentOrder(wdAsc)
      onChange({ fieldName, sortOrder: wdAsc })
    } else if (_currentOrder === wdAsc) {
      _setCurrentOrder(wdDesc)
      onChange({ fieldName, sortOrder: wdDesc })
    } else {
      _setCurrentOrder(wdNone)
      onChange({ fieldName: '', sortOrder: wdNone })
    }
  }
  return (
    <SortIconDiv onClick={() => _click(fieldName)}>
      <SortAscTriangle
        width={15}
        fillColor={_currentOrder === wdAsc ? _activeColor : _inactiveColor}
      />
      <SpacerDiv></SpacerDiv>
      <SortDescTriangle
        width={15}
        fillColor={_currentOrder === wdDesc ? _activeColor : _inactiveColor}
      />
    </SortIconDiv>
  )
}
