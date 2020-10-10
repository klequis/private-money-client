import React from 'react'
import styled from 'styled-components'

// eslint-disable-next-line
import { green, redf } from 'logger'

const Wrapper = styled.div`
  @media (min-width: 601px) {
    margin-bottom: 29.1665;
  }

  @media (max-width: 600px) {
    margin-bottom: 0;
    text-align: center;
  }
`
// style={{ marginBottom: 29.1665 }}

type TProps = {
  name: string,
  checked: boolean,
  onChange: React.FormEventHandler<HTMLInputElement>
}


const CheckBox = ({
  name,
  checked,
  onChange,
}: TProps ) => {
  const _handleChange = (event: React.ChangeEvent<HTMLInputElement>) => onChange(event)
    
  return <Wrapper> <input type="checkbox" name={name} checked={checked} onChange={_handleChange}/></Wrapper>
}

export default CheckBox
