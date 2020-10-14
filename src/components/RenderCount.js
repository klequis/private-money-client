import React from 'react'
import * as R from 'ramda'

const getStyle = (actual, min, max) => {
  if (actual < min) {
    return { color: 'green' }
  }
  if (actual === min) {
    return { color: 'white' }
  }
  if (actual > min && actual < min) {
    return { color: 'yellow' }
  }
  if (actual > max) {
    return { color: 'red' }
  }
}

const RenderResult = ({ title, count }) => {
  const { actual, min, max } = count
  return (
    
    <span style={getStyle(actual, min, max)}>
      <span>{title}:</span> (<span>actual=<b>{actual}</b></span>, <span>min=<b>{min}</b></span>, <span>max=<b>{max}</b></span>)
    </span>
  )
}

const RenderCount = ({ name, countTotal = {}, countReturn = {} }) => {
  
  return (
    <div style={{ fontSize: 20 }}>
      <b>{name} - </b>
      <span>
        <RenderResult title='before' count={countTotal} />
        {
          !R.isEmpty(countReturn)
            ? <span>&nbsp; &nbsp; <RenderResult title='after' count={countReturn} /></span>
            : null
        }
        
         
      </span>
    </div>
  )
}

export default RenderCount