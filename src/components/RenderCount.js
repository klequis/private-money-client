import React from 'react'

const RenderResult = ({ title, count, expected }) => {
  return (
    <span style={count === expected ? { color: 'white' } : { color: 'red' }}>
      {title}: (actual=<b>{count}</b>, expected=<b>{expected}</b>)
    </span>
  )
}

const RenderCount = ({ name, countTotal, countTotalExpected, countReturn = null, countReturnExpected }) => {
  return (
    <div style={{ fontSize: 20 }}>
      <b>{name} - </b>
      <span>
        <RenderResult title='total' count={countTotal} expected={countTotalExpected} />
        {countReturn !== null
          ? <span>&nbsp; &nbsp; <RenderResult title='total' count={countReturn} expected={countReturnExpected} /></span>
          : null
        }
      </span>
    </div>
  )
}

export default RenderCount