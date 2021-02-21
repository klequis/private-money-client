import { useRef, useState } from 'react'
import * as R from 'ramda'
import { ResultTable } from './ResultTable'

// eslint-disable-next-line
import { orange, green, redf, purple } from 'logger'

export const FileUpload = () => {
  const [_files, _setFiles] = useState()

  const [_result, _setResult] = useState({
    dirname: '',
    fields: {},
    uploadedFiles: [],
    uploadsDir: ''
  })

  const _el = useRef()

  const _onFileChange = (e) => {
    const files = Array.from(e.target.files)
    _setFiles(files)
  }

  const _uploadFiles = async () => {
    let formData = new FormData()

    _files.forEach((f) => {
      formData.append('uploadedFiles', f)
    })

    // const r = await api.uploadFiles({ message: 'hi up' })
    // const r = await api.uploadFiles(formData)
    const r = await fetch('http://localhost:3030/api/upload', {
      method: 'POST',
      body: formData
    })
    const j = await r.json()

    const { dirname, fields, files, uploadsDir } = j
    const { uploadedFiles } = files
    _setResult({ dirname, fields, uploadedFiles, uploadsDir })
  }

  return (
    <>
      <div className="file-upload">
        <input
          type="file"
          ref={_el}
          onChange={_onFileChange}
          name="filesInput"
          multiple
        />
        <button onClick={_uploadFiles}>upload</button>
      </div>
      {_result.uploadedFiles.length > 0
        ? R.map(
            (f) => <ResultTable key={f.name} file={f} />,
            _result.uploadedFiles
          )
        : null}
    </>
  )
}
