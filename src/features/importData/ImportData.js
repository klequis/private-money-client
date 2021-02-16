import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export const ImportData = () => {
  const [_file, _setFile] = useState()

  const _onFileChange = (event) => {
    _setFile(event.target.files[0])
  }

  return (
    <div>
      <nav>
        <Link to="/">Home</Link>
      </nav>
      <input type="file" onChange={_onFileChange} />
    </div>
  )
}
