import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { api } from 'api'

// eslint-disable-next-line
import { orange, green, redf, purple } from 'logger'

export const FileUpload = () => {
  const [_file, _setFile] = useState('')
  const [_data, _getFile] = useState({ name: '', path: '' })
  const [_progress, _setProgess] = useState(0)
  const _el = useRef()

  const _onFileChange = (e) => {
    _setProgess(0)
    const file = e.target.files[0]
    console.log(file)
    _setFile(file)
  }

  const uploadFile = async () => {
    let formData = new FormData()
    formData.append('upload', _file)
    // const r = await api.uploadFiles({ message: 'hi up' })
    const r = await api.uploadFiles(formData)
    green('r', r)
  }

  const test = async () => {
    api.test()
  }

  return (
    <div>
      <nav>
        <Link to="/">Home</Link>
      </nav>
      <div className="file-upload">
        <input type="file" ref={_el} onChange={_onFileChange} />
        <button onClick={uploadFile}>upload</button>
      </div>
      <div>
        <button onClick={test}>Test</button>
      </div>
    </div>
  )
}
