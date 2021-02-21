import { isNilOrEmpty } from 'lib/isNilOrEmpty'
import styled from 'styled-components'

// eslint-disable-next-line
import { green } from 'logger'

const RadioDev = styled.div`
  width: ${({ width }) => (isNilOrEmpty(width) ? 'auto' : `${width}px`)};
`

export const Radio = ({
  disabled,
  id,
  labelText,
  name,
  value,
  onChange,
  groupValue,
  width = null
}) => {
  const _change = (event) => {
    onChange(event)
  }

  return (
    <RadioDev className="form-check" width={width}>
      <label className="form-check-label" htmlFor={id}>
        <input
          className="form-check-input"
          checked={value === groupValue}
          disabled={disabled}
          id={id}
          name={name}
          onChange={_change}
          type="radio"
          value={value}
        />
        {labelText}
      </label>
    </RadioDev>
  )
}
