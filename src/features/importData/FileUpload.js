import { useRef, useState } from 'react'
import * as R from 'ramda'
// import { ResultTable } from './ResultTable'
import { ChooseFiles } from './ChooseFiles'
import { AssociateAccounts } from './AssciateAccounts'

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

  const _uploadFiles = async () => {
    let formData = new FormData()

    _files.forEach((f) => {
      formData.append('uploadedFiles', f)
    })

    // ||  for pm-merge server   ||
    // via api.js: const r = await api.uploadFiles(formData)
    const r = await fetch('http://localhost:3030/api/uploadFiles/upload', {
      method: 'POST',
      body: formData
    })

    // ||  for --ex server   ||
    // const r = await fetch('http://localhost:3030/api/upload', {
    //   method: 'POST',
    //   body: formData
    // })
    const j = await r.json()
    green('j', j)

    const { dirname, fields, files, uploadsDir } = j
    const { uploadedFiles } = files
    _setResult({ dirname, fields, uploadedFiles, uploadsDir })
  }

  return (
    <>
      <div className="file-upload">
        <ChooseFiles setFiles={_setFiles} />
        <button onClick={_uploadFiles}>upload</button>
      </div>
      <AssociateAccounts files={_files} />
      {/* {_result.uploadedFiles.length > 0
        ? R.map(
            (f) => <ResultTable key={f.name} file={f} />,
            _result.uploadedFiles
          )
        : null} */}
    </>
  )
}
