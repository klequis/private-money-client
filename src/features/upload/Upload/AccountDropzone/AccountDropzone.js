import { DropZone } from './DropZone'
import { useDropzone } from 'react-dropzone'
import { customFileGetter } from './customFileGetter'
import * as R from 'ramda'
import { Card } from 'components/Card'
import { CardBody } from 'components/CardBody'
import { FilesDiv } from './FilesDiv'
import { File } from './File'
import { nanoid } from 'nanoid'

/*
    @param {Array} of File objects
    @description: sorts array of File objects by File.accepted custom property
 */
const filesSort = R.sortWith([R.descend(R.prop('accepted'))])

/*
    @param {string} acctId: account ID for this AccountDropzone
    @param {Array} files: of File objects. All files for all accounts
    @description: filters array of File objects by File.accepted: bool
*/
const filesFilter = (acctId) => (files) =>
  R.filter((f) => f.acctId === acctId)(files)

/*
    @param {string} acctId: account ID for this AccountDropzone
    @param {Array} files: of File objects. All files for all accounts
    @description: returns array of filtered & sorted <File /> components
*/
const Files = ({ acctId, files, progress }) => {
  return R.pipe(
    filesFilter(acctId),
    filesSort,
    R.map((file) => (
      <File
        key={file.duplicate ? nanoid() : file.name}
        file={file}
        progress={progress}
      />
    ))
  )(files)
}

export const AccountDropzone = ({
  account,
  files = [],
  addFiles,
  progress
}) => {
  const _onDrop = (acceptedFiles) => {
    addFiles(acceptedFiles) // `addFiles` does a concat
  }

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: _onDrop,

    getFilesFromEvent: (event) => customFileGetter(event, account.acctId, files)
  })

  return (
    <Card>
      <CardBody>
        <DropZone
          getRootProps={getRootProps}
          getInputProps={getInputProps}
          account={account}
        />
        <FilesDiv>
          <Files files={files} acctId={account.acctId} progress={progress} />
        </FilesDiv>
      </CardBody>
    </Card>
  )
}
