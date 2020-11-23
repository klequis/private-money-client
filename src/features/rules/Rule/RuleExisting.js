import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  selectActiveTransaction,
} from 'features/transactions'
import {
  ruleEditSet,
} from 'features/rules'
import {
  selectRule
} from 'features/rules'
import styled from 'styled-components'
import { Criteria, Actions } from 'features/rules'

import * as R from 'ramda'

// eslint-disable-next-line
import { green } from 'logger'

const RuleDiv = styled.div``

export const RuleExisting = ({ save, cancel }) => {
  return (
    <RuleDiv id="Rule">
      <Criteria />
      <Actions />
    </RuleDiv>
  )
}
