import React, { useState } from 'react'
import Criteria from './Criteria'
import Actions from './Actions'
import Button from 'components/Button'

// eslint-disable-next-line
import { green } from 'logger'

const RuleEdit = ({ ruleId }) => {
  green('hi from RuleEdit')

  const _handleSaveEditButtonClick = () => {}

  return (
    <tr>
      <td colSpan="10">
        <div className="d-flex">
          <div>{`RuleId: ${ruleId}`}</div>
          <Button onClick={_handleSaveEditButtonClick}>Save</Button>
        </div>
        <Criteria ruleId={ruleId} />
        <Actions ruleId={ruleId} />
      </td>
    </tr>
  )
}

export default RuleEdit

/*


const RuleEdit = ({ ruleId }) => {
  green('hi from RuleEdit')
  const [_isEditMode, _setIsEditMode] = useState(false)

  const _handleSaveEditButtonClick = () => _setIsEditMode(!_isEditMode)

  return (
    <tr>
      <td colSpan="10">
        <div className="d-flex">
          <div>{`RuleId: ${ruleId}`}</div>
          {_isEditMode ? (
            <Button onClick={_handleSaveEditButtonClick}>Save</Button>
          ) : (
            <Button onClick={_handleSaveEditButtonClick}>Edit</Button>
          )}
        </div>

        <div>
          <Criteria ruleId={ruleId} />
        </div>
        <div>
          <Actions ruleId={ruleId} isEditMode={_isEditMode} />
        </div>
      </td>
    </tr>
  )
}

export default RuleEdit

*/
