import React, { useState, useEffect } from 'react'
// ** import Switch from '@material-ui/core/Switch'
// ** import FormControlLabel from '@material-ui/core/FormControlLabel'
import { useDispatch, useSelector } from 'react-redux'
import isTmpRule from 'lib/isTmpRule'
import isNilOrEmpty from 'lib/isNilOrEmpty'
import * as R from 'ramda'
import shortid from 'shortid'
// xx import { useAppContext } from 'appContext'
// ** import { operators, dataFieldNames } from 'global-constants'
// ** import CriterionEdit from './CriterionEdit'
// ** import ActionButton, { buttonTypes } from 'ui/elements/ActionButton'
// ** import Omit from './Omit'
import Form from 'react-bootstrap/Form'
import {
  selectTransactionRuleIds,
  selectOneTransaction
} from 'features/transactions/transactionsSlice'
import Rule from './Rule'
import { green } from 'logger'
import { ruleTmpCreate } from 'features/rulesTmp/rulesTmpSlice'
import { selectActiveTransaction } from 'features/transactions/transactionsSlice'

const _ruleTmpCreate = (tmpId) => {
  ruleTmpCreate(tmpId)
}

const _ruleTmpUpdate = () => {}

const _ruleTmpDelete = () => {}

const _ruleCreate = () => {}

const _ruleDelete = () => {}

const _ruleUpdate = () => {}

const makeTmpRuleId = () => `tmp_${shortid.generate()}`

const Rules = () => {
  const dispatch = useDispatch()

  const activeTransaction = useSelector(selectActiveTransaction)
  const { ruleIds } = activeTransaction
  const [_ruleIds, _setRuleIds] = useState(ruleIds)

  useEffect(() => {
    if (_ruleIds === undefined) {
      const tmpId = makeTmpRuleId()
      dispatch(
        ruleTmpCreate({ tmpId, origDescription: activeTransaction.origDescription })
      )
      _setRuleIds(R.append(tmpId, _ruleIds))
    }
  }, [dispatch, ruleTmpCreate])

  return (
    <>
      {_ruleIds !== undefined
        ? _ruleIds.map((id) => (
            <Rule key={id} ruleId={id} />
          ))
        : null}
    </>
  )
}

export default Rules
