import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'

// eslint-disable-next-line
import { green } from 'logger'

export const Switch = ({ label, checkedSelector, checkedAction, id }) => {
  const dispatch = useDispatch()
  // const [_checked, _setChecked] = useState(false)


  const _onChange = (event) => {

    // const checked = event.target.checked
    // _setChecked(checked)
    green('****   _onChange   ****', 'called')
    dispatch(checkedAction())
    
  }

  const isChecked = useSelector(checkedSelector)

  return (
    <div className="custom-control custom-switch">
      <input 
        type="checkbox"
        className="custom-control-input"
        id={id}
        checked={isChecked}
        onChange={_onChange}
      />
      <label className="custom-control-label" htmlFor={id}>{label}</label>
    </div>
  )

}