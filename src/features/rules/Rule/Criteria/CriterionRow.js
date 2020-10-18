import React from 'react'
import styled from 'styled-components'

const Row = styled.div`
  
  display: flex;
  @media (max-width: 576px) {
    flex-direction: column;
    aligh-items: flex-start;
  }
`

/*
background-color: white;
  border: 10px solid black;
  */
 
/*
  display: flex;
  @media (max-width: 576px) {
    flex-direction: column;
    aligh-items: flex-start;
  }
*/

const CriterionRow = ({children}) => {
  return (
    <Row>
      {children}
    </Row>
  )
}

export default CriterionRow