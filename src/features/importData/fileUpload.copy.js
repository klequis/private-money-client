import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export const ImportData = () => {
  const [_file, _setFile] = useState()

  const _onFileChange = (event) => {
    _setFile(event.target.files[0])
  }

  const fileData = () => {
    if (_file) {
      return (
        <div>
          <h2>File Details:</h2>

          <p>File Name: {_file.name}</p>

          <p>File Type: {_file.type}</p>
          <p>FileSize: {_file.size}</p>

          <p>Last Modified: {_file.lastModifiedDate.toDateString()}</p>
        </div>
      )
    } else {
      return (
        <div>
          <br />
          <h4>Choose before Pressing the Upload button</h4>
        </div>
      )
    }
  }

  return (
    <div>
      <nav>
        <Link to="/">Home</Link>
      </nav>
      <input type="file" onChange={_onFileChange} />
      {fileData()}
    </div>
  )
}
