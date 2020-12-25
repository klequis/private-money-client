import React from 'react'
import styled from 'styled-components'
import { HasRuleOptions } from './HasRuleOptions'
import { IncomeOrExpenseOptions } from './IncomeOrExpenseOptions'
import { IsCategorizedOptions } from './IsCategorizedOptions'
import { ShowOmittedOptions } from './ShowOmittedOptions'

// eslint-disable-next-line
import { purple, green } from 'logger'

const OptionsDiv = styled.div`
  display: flex;
  padding: 5px;
`

const ColumnDiv = styled.div`
  display: flex;
  flex-direction: column;
`

export const TxTblOptions = () => {
  return (
    <OptionsDiv>
      <ColumnDiv style={{ backgroundColor: 'red' }}>
        <HasRuleOptions />
        <IsCategorizedOptions />
      </ColumnDiv>
      <ColumnDiv style={{ backgroundColor: 'green' }}>
        <IncomeOrExpenseOptions />
      </ColumnDiv>
      <ColumnDiv>
        <ShowOmittedOptions />
      </ColumnDiv>
    </OptionsDiv>
  )
}
