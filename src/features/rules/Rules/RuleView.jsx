import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Criteria from './Criteria'
import Actions from './Actions'
import Button from 'components/Button'
import { selectOneRule } from 'features/rules/rulesSlice'
import * as R from 'ramda'

// eslint-disable-next-line
import { green } from 'logger'

const TextField = ({ children }) => (
  <div style={{ marginRight: 5 }}>{children}</div>
)

const Categories = ({ action }) => {
  return (
    <div>
      <div>category1: {action.category1}</div>
      <div>category2: {action.category2}</div>
    </div>
  )
}

const Rename = ({ action }) => {
  return <div>Rename as: {action.replaceWithValue}</div>
}

const RuleView = ({ ruleId }) => {
  const [_isEditMode, _setIsEditMode] = useState(false)
  const [_omitTrue, _setOmitTrue] = useState(false)

  const rule = useSelector((state) => selectOneRule(ruleId, state))
  const _handleSaveEditButtonClick = () => _setIsEditMode(!_isEditMode)
  const { criteria, actions } = rule
  return (
    <tr>
      <td colSpan="10">
        <div className="d-flex">
          <div>{`RuleId: ${ruleId}`}</div>
          <Button onClick={_handleSaveEditButtonClick}>Edit</Button>
        </div>
        <div>
          {criteria.map((c) => (
            <div key={c._id} className="d-flex">
              <TextField value={c.field} />
              <TextField value={c.operation} />
              <TextField value={c.value} />
            </div>
          ))}
        </div>
        <div>
          {actions.map((a) => {
            const actionType = R.prop('actionType')(a)
            return (
              <div key={a._id}>
                <div>
                  {actionType === 'omit' ? (
                    <div>Transaction has been omiteed</div>
                  ) : null}
                </div>
                <div>
                  {actionType === 'replaceAll' ? (
                    <Rename key={a._id} action={a} />
                  ) : null}
                </div>
                <div>
                  {actionType === 'categorize' ? (
                    <Categories key={a._id} action={a} />
                  ) : null}
                </div>
              </div>
            )
          })}
        </div>
      </td>
    </tr>
  )
}

export default RuleView
