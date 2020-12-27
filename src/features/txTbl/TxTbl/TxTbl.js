import React from 'react'
import { useSelector } from 'react-redux'
import { Table as BaseTable } from 'components/Table'
import { TxTblBody } from './TxTblBody'
import { TxTblHead } from './TxTblHead'
import { selectFilteredTxs } from 'features/selectors'
import styled from 'styled-components'
import { ContainerFluid } from 'components/ContainerFluid'
import { TxTblOptions } from './TxTblOptions'
/* eslint-disable */
import { purple, green, red } from 'logger'
import { RenderCount } from 'components/RenderCount'
/* eslint-enable */

const NumRowsDiv = styled.div`
  margin-top: 1.25rem;
  margin-bottom: 1.25rem;
`

export const TxTbl = () => {
  const _filteredTx = useSelector(selectFilteredTxs)

  return (
    <ContainerFluid>
      <h1>Transactions Table</h1>
      <TxTblOptions />
      <NumRowsDiv>Number of rows: {_filteredTx.length}</NumRowsDiv>
      <BaseTable>
        <TxTblHead />
        {_filteredTx.map((t) => (
          <TxTblBody key={t._id} txId={t._id} />
        ))}
      </BaseTable>
    </ContainerFluid>
  )
}

/*
let countTotal = 0
let countReturn = 0
countTotal = countTotal + 1
countReturn = countReturn + 1
<RenderCount
          componentName="TxTbl"
          countTotal={{ actual: countTotal, min: 8, max: 14 }}
          countReturn={{ actual: countReturn, min: 8, max: 10 }}
        />
*/
