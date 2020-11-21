import React from 'react'
import PropTypes from 'prop-types'
import * as R from 'ramda'
import { green } from 'logger'
import { yellow } from 'logger'
import { red } from 'logger'

const RenderResult = ({ title, count }) => {
  const { actual, min, max } = count
  return (
    
    <span>
      <span>{title}:</span> (<span>actual=<b>{actual}</b></span>, <span>min=<b>{min}</b></span>, <span>max=<b>{max}</b></span>)
    </span>
  )
}

const inRange = (count) => {
  const { actual, min, max} = count
  if (R.isEmpty(count)) {
    return true
  }
  return (actual >= min && actual <= max)
}
const isInRange = (countTotal, countReturn) => {
  const r = inRange(countTotal) && inRange(countReturn)
  return r
}

export const RenderCount = ({ componentName, countTotal = {}, countReturn = {} }) => {
  // if (isInRange(countTotal, countReturn)) {
  //   return null
  // }
  // return null
  const inRange = isInRange(countTotal, countReturn)
  return (
    <div style={ inRange ? {color: 'rgba(255, 255, 255, 0.3)'} : { color: 'red' }}>
      <span>{componentName} - </span>
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

RenderCount.propTypes = {
  componentName: PropTypes.string.isRequired,
  countTotal: PropTypes.shape({
    actual: PropTypes.number.isRequired,
    min: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired
  }).isRequired,
  countReturn: PropTypes.shape({
    actual: PropTypes.number.isRequired,
    min: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired
  }).isRequired
  
}
