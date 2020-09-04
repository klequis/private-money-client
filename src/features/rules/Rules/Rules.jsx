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
import Criteria from './Criteria'
import { selectTransactionRuleIds } from 'features/transactions/transactionsSlice'
import Rule from './Rule'
import { green } from 'logger'
import styles from './Rules.module.css'
import { ruleTmpCreate } from 'features/rulesTmp/rulesTmpSlice'

// const _ruleTmpAddClick = async () => {
//   const tmpId = `tmp_${shortid.generate()}`
//   ruleTmpAdd({
//     _id: tmpId,
//     criteria: [
//       {
//         _id: `tmp_${shortid.generate()}`,
//         field: '',
//         operation: '',
//         value: ''
//       }
//     ],
//     actions: [
//       {
//         _id: `tmp_${shortid.generate()}`
//       }
//     ]
//   })
//   const newRuleIds = append(tmpId, _ruleIds)
//   _setRuleIds(newRuleIds)
// }

const _ruleTmpCreate = (tmpId) => {
  ruleTmpCreate(tmpId)
}

const _ruleTmpUpdate = () => {

}

const _ruleTmpDelete = () => {

}

const _ruleCreate = () => {

}

const _ruleDelete = () => {

}

const _ruleUpdate = () => {

}

const makeTmpRuleId = () => `tmp_${shortid.generate()}`

const Rules = ({ transactionId }) => {

  const dispatch = useDispatch()

  const [_ruleIds, _setRuleIds] = useState(
    useSelector((state) => selectTransactionRuleIds(transactionId, state))
  )

  useEffect(() => {
    if (_ruleIds === undefined) {
      const tmpId = makeTmpRuleId()
      dispatch(ruleTmpCreate(tmpId))
      _setRuleIds(R.append(tmpId, _ruleIds))
    }
  }, [dispatch, ruleTmpCreate])

  // const _ruleTmpAddClick = async () => {
  //   const tmpId = `tmp_${shortid.generate()}`
  //   ruleTmpAdd(_ruleTmpCreate(tmpId))
  //   const newRuleIds = append(tmpId, _ruleIds)
  //   _setRuleIds(newRuleIds)
  // }

  // green('_ruleIds', _ruleIds)

  return (
    <>
      <tr>
        <td colSpan="10">
          <div className={styles.omitAndDateCheck}>
            <Form.Check type="switch" id="omit" label="omit" />
            <Form.Check
              type="switch"
              id="this-date-only"
              label="zz/zz/zzzz only"
            />
          </div>
        </td>
      </tr>
      {_ruleIds !== undefined
        ? _ruleIds.map((id) => <Rule key={id} ruleId={id} />)
        : null}
    </>
  )
}

export default Rules
