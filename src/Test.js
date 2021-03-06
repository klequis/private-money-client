import { useState } from 'react'

export const Test = () => {
  const [_result, _setResult] = useState('waiting')

  const _testOnClick = async () => {
    const r = await fetch('http://localhost:4040/api/test', {
      method: 'GET'
    })
    _setResult(await r.json())
  }
  return (
    <div>
      <button onClick={_testOnClick}>Test</button>
      <br />
      <b>result: </b>&nbsp;{JSON.stringify(_result)}
    </div>
  )
}
