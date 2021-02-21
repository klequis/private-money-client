import styled from 'styled-components'

const SwitchDiv = styled.div`
  margin-right: 3rem;
`

export const Switch = ({ checked, disabled, id, label }) => {
  return (
    <SwitchDiv>
      <div class="custom-control custom-switch">
        <input
          type="checkbox"
          class="custom-control-input"
          id={id}
          checked={checked}
          disabled={disabled}
        />
        <label class="custom-control-label" htmlFor="all">
          {label}
        </label>
      </div>
    </SwitchDiv>
  )
}
