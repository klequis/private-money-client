import React, { useState } from 'react'
import { selectAcctItems } from 'features/selectors'
import { Grid } from 'components/Grid'
import { Button } from 'components/Button'
import * as R from 'ramda'
import { AccountDropzone } from './AccountDropzone'

/* eslint-disable */
import { green, purple, red } from 'logger'
import { RenderCount } from 'components/RenderCount'
import { selectRequestStatus } from 'features/selectors'
import { useDispatch, useSelector } from 'react-redux'
import { wdAcct } from 'appWords'
import axios from 'axios'
/* eslint-enable */

/*
    - get all the accounts
    - map accounts to dropzones
    - enjoy
*/
export const Upload = () => {
  const accounts = useSelector(selectAcctItems)

  const _uploadClick = async () => {
    if (_acceptedLength === 0) return

    const allAcceptedFiles = _fileList.filter((f) => f.accepted)
    // options

    // promise.all
    const result = await Promise.all(
      allAcceptedFiles.map((f) => {
        const options = {
          onUploadProgress: ({ total, loaded }) => {
            // console.log('----------------------------------------------')
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
        return axios.post('http://localhost:3030/api/upload', formData, options)
      })
    )

    const uploadedFileNames = result.map((x) => x.data.result)
    // console.log('uploadedFileNames', uploadedFileNames)

    const newFileList = R.map(
      (f) => setWasUploaded(f, uploadedFileNames),
      _fileList
    )
    _setFileList(newFileList)
  }

  console.log('accounts', accounts)
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
