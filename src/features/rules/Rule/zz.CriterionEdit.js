import React, { useState } from 'react'
// ** import PropTypes from 'prop-types'
// ** import Select from 'ui/elements/Select'
// ** import MenuItem from '@material-ui/core/MenuItem'
// ** import { makeStyles } from '@material-ui/styles'

import { operators, transactionFields as fields } from 'globalConstants'
// ** import TextField from 'ui/elements/TextField'
import { mergeRight } from 'ramda'
// ** import ActionButton, { buttonTypes } from 'ui/elements/ActionButton'
// import { format } from 'date-fns'

// eslint-disable-next-line
import { green, redf } from 'logger'

// const useStyles = makeStyles({
//   wrapper: {
//     display: 'flex',
//     padding: '4px 8px'
//   },
//   field: {
//     marginRight: 10
//   },
//   actions: {
//     display: 'flex',
//     alignItems: 'flex-end',
//     marginLeft: 35
//   },
//   viewModeField: {
//     marginRight: 20
//   }
// })

const CriterionEdit = ({
  criterion,
  criterionRemove,
  handleCriterionChange,
  handleDirtyChange
}) => {
  const { _id, field, operation, value } = criterion

  const [values, setValues] = useState({
    _id,
    field: field || fields.description,
    operation: operation || operators.beginsWith.name,
    value
  })

  const _handleChange = (event) => {
    const { name, value } = event.target
    const newValues = mergeRight(values, { [name]: value })

    setValues(newValues)
    handleDirtyChange(true)
    handleCriterionChange(newValues)
  }

  const _criterionRemove = () => {
    criterionRemove(_id)
  }

  return (
    <div>
      <div>
        
        {/* SELECT FIELD DROPDOWN */}

        {/* <Select
          className={_classes.field}
          name="field"
          value={values.field}
          onChange={_handleChange}
        >
          <MenuItem value={dataFieldNames.description}>Description</MenuItem>
          <MenuItem value={dataFieldNames.type}>Type</MenuItem>
          <MenuItem value={dataFieldNames.credit}>Credit</MenuItem>
          <MenuItem value={dataFieldNames.debit}>Debit</MenuItem>
          <MenuItem value={dataFieldNames.acctId}>AcctId</MenuItem>
          <MenuItem value={dataFieldNames.date}>Date</MenuItem>
        </Select> */}

        <Form.Control as="select">
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
        </Form.Control>


        {/* SELECT OPERATOR DROPDOWN */}
        
        {/* <Select
          className={_classes.field}
          name="operation"
          value={values.operation}
          onChange={_handleChange}
        >
          <MenuItem value={operators.beginsWith}>Begins with</MenuItem>
          <MenuItem value={operators.contains}>Contains</MenuItem>
          <MenuItem value={operators.doesNotContain}>Does not contain</MenuItem>
          <MenuItem value={operators.equals}>Equals</MenuItem>
        </Select> */}

        <Form.Control as="select">
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
        </Form.Control>

        {/* FIELD VALUE TEXT EDIT  */}

        {/* <TextField
          className={_classes.field}
          name="value"
          label="value"
          type="date"
          value={values.value}
          onChange={_handleChange}
          fullWidth
        /> */}

        <Form.Control type="text" value={values.value} />

        {/* REMOVE / CANCEL BUTTON */}
        {/* <ActionButton
          buttonType={buttonTypes.remove}
          onClick={_criterionRemove}
        /> */}
        <Button variant="primary" onClick={_criterionRemove}>Primary</Button>

      </div>
    </div>
  )
}

export default CriterionEdit

// CriterionEdit.propTypes = {
//   criterion: PropTypes.shape({
//     _id: PropTypes.string.isRequired,
//     field: PropTypes.string.isRequired,
//     operation: PropTypes.string.isRequired,
//     value: PropTypes.string.isRequired
//   })
// }
