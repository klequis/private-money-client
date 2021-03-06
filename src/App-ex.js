import { useRef, useState } from 'react'
// import './App.css'
import * as R from 'ramda'
import { ResultTable } from './ResultTable'
import { Test } from './Test'

export const App = () => {
  const [_files, _setFiles] = useState()

  const [_result, _setResult] = useState({
    dirname: '',
    fields: {},
    uploadedFiles: [],
    uploadDir: ''
  })

  const _el = useRef()

  const _onFileChange = (e) => {
    const files = Array.from(e.target.files)
    _setFiles(files)
  }

  const _uploadFile = async (event) => {
    const formData = new FormData()

    _files.forEach((f) => {
      formData.append('uploadedFiles', f)
    })

    // -- ex
    // const r = await fetch('http://localhost:3030/api/upload', {
    //   method: 'POST',
    //   body: formData
    // })

    // pm-merge
    const r = await fetch('http://localhost:3030/api/uploadFiles/upload', {
      method: 'POST',
      body: formData
    })

    const j = await r.json()
    console.log('j', j)
    const { dirname, fields, files, uploadDir } = j
    const { uploadedFiles } = files
    // console.log('files', uploadedFiles)
    _setResult({ dirname, fields, uploadedFiles, uploadDir })
  }

  return (
    <>
      <Test />
      <div className="file-upload">
        <input
          className="fileInput"
          type="file"
          ref={_el}
          onChange={_onFileChange}
          name="someExpressFiles"
          multiple
        />
        <button onClick={_uploadFile}>upload</button>
      </div>
      <hr />
      uploadDir set to: {_result.uploadDir}
      <hr />
      {_result.uploadedFiles.length > 0
        ? R.map(
            (f) => <ResultTable key={f.name} file={f} />,
            _result.uploadedFiles
          )
        : null}
    </>
  )
}
