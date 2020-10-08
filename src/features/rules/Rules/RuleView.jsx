import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Button from 'components/Button'
import { selectOneRule } from 'features/rules/rulesSlice'
import * as R from 'ramda'
import RuleId from './RuleId'
import { actionTypes } from 'globalConstants'

// eslint-disable-next-line
import { green, purple } from 'logger'

const TextField = ({ children }) => (
  <div style={{ marginRight: 5 }}>{children}</div>
)

const Categories = ({ action }) => {
  purple('>>> Categories', 'render')
  return (
    <div>
      <div>category1: {action.category1}</div>
      <div>category2: {action.category2}</div>
    </div>
  )
}

const Rename = ({ action }) => {
  purple('>>> Rename', 'render')
  return <div>Rename as: {action.replaceWithValue}</div>
}

const RuleView = ({ ruleId }) => {
  purple('>>> RuleView', 'render')
  const [_isEditMode, _setIsEditMode] = useState(false)

  const rule = useSelector((state) => selectOneRule(ruleId, state))
  const _handleSaveEditButtonClick = () => _setIsEditMode(!_isEditMode)
  const { criteria, actions } = rule
  
  return (
    <tr>
      <td colSpan="10">
        <div className="d-flex">
          <div style={{ fontSize: '0.8rem' }}>{`RuleId: ${ruleId}`}</div>
          <RuleId ruleId={ruleId} />
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
                  {actionType === actionTypes.omit.name ? (
                    <div>Transaction has been omiteed</div>
                  ) : null}
                </div>
                <div>
                  {actionType === actionTypes.replaceAll.name ? (
                    <Rename key={a._id} action={a} />
                  ) : null}
                </div>
                <div>
                  {actionType === actionTypes.categorize.name ? (
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
