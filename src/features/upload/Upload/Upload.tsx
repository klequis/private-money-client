import React, { useState } from 'react'
import { selectAcctItems } from 'features/selectors'
import { Grid } from 'components/Grid'
import { Button } from 'components/Button'
import * as R from 'ramda'
import { AccountDropzone } from './AccountDropzone'
import { useSelector } from 'react-redux'
import axios from 'axios'

/* eslint-disable */
import { green, purple, red } from 'logger'
import { RenderCount } from 'components/RenderCount'
/* eslint-enable */

const setWasUploaded = (file, names) => {
  const { name } = file
  const a = R.any((n) => n === name)(names)
  file.wasUploaded = a
  return file
}

/*
    - get all the accounts
    - map accounts to dropzones
    - enjoy
*/
export const Upload = () => {
  const [_fileList, _setFileList] = useState([])
  const [_progress, _setProgress] = useState({})

  const accounts = useSelector(selectAcctItems)

  const _addFiles = (file) => {
    _setFileList(R.concat(file, _fileList))
  }

  const _uploadClick = async () => {
    const _acceptedLength = _fileList.length
    if (_acceptedLength === 0) return

    const onProgress = (filename, progressNum) => {
      _setProgress({ filename, progressNum })
    }

    const allAcceptedFiles = _fileList.filter((f) => f.accepted)
    green('allAcceptedFiles', allAcceptedFiles)

    const result = await Promise.all(
      allAcceptedFiles.map((f) => {
        const options = {
          onUploadProgress: ({ total, loaded }) => {
            return onProgress(
              f.name,
              Math.round((loaded / total) * 100).toFixed(2)
            )
          }
        }

        const formData = new FormData()
        formData.append('uploadedFiles', f)
        formData.append(f.name, f.name)
        formData.append(f.name, f.acctId)
        return axios.post('http://localhost:3030/api/import', formData, options)
      })
    )

    green('result', result)
    const uploadedFileNames = result.map((x) => x.data.result)

    const newFileList = R.map(
      (f) => setWasUploaded(f, uploadedFileNames),
      _fileList
    )
    _setFileList(newFileList)
  }

  return (
    <div>
      <Button onClick={_uploadClick}>Upload</Button>
      <Grid>
        {accounts.map((a) => (
          <AccountDropzone
            key={a.acctId}
            account={a}
            files={_fileList}
            addFiles={_addFiles}
            progress={_progress}
          />
        ))}
      </Grid>
    </div>
  )
}