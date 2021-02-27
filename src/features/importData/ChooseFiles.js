import React, { useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import styled from 'styled-components'
import * as R from 'ramda'

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-width: 2px;
  border-radius: 2px;

  border-style: dashed;
  background-color: var(--blue);
  color: #bdbdbd;
  outline: none;
  transition: border 0.24s ease-in-out;
`

const AcceptedDiv = styled.div`
  margin-top: 20px;
`

const RejectedDiv = styled.div`
  margin-top: 20px;
`

const TitleH1 = styled.h1`
  font-size: 2rem;
  margin-top: 20px;
  margin-bottom: 20px;
`

export const ChooseFiles = ({ setFiles }) => {
  const [_accepted, _setAccepted] = useState([])
  const [_rejected, _setRejected] = useState([])

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    getFilesFromEvent: (event) => customFileGetter(event)
  })

  useEffect(() => {
    acceptedFiles.forEach((f) => {
      f.accept
        ? _setAccepted(R.append(f, _accepted))
        : _setRejected(R.append(f, _rejected))
    })
    setFiles(_accepted)
    // eslint-disable-next-line
  }, [acceptedFiles /*, _accepted, _rejected */])

  return (
    <section className="container">
      <TitleH1>React Dropzone Example</TitleH1>
      <Container {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
        <small>Only .csv files accepted</small>
      </Container>
      <aside>
        <AcceptedDiv>
          {_accepted.length > 0 ? (
            <>
              <h4>Files to upload</h4>
              <ul>
                {_accepted.map((f) => (
                  <li key={f.name}>{f.name}</li>
                ))}
              </ul>
            </>
          ) : null}
        </AcceptedDiv>
        <RejectedDiv>
          {_rejected.length > 0 ? (
            <>
              <h4>Rejected</h4>
              <i>Only .csv files are accepted.</i>
              <ul>
                {_rejected.map((f) => (
                  <li key={f.name}>{f.name}</li>
                ))}
              </ul>
            </>
          ) : null}
        </RejectedDiv>
      </aside>
    </section>
  )
}

/**
 *
 * @param {event} event fileDrop event
 * @returns {Array} array of accepted files
 */
async function customFileGetter(event) {
  const files = []
  const fileList = event.dataTransfer
    ? event.dataTransfer.files
    : event.target.files

  for (var i = 0; i < fileList.length; i++) {
    const file = fileList.item(i)
    const filename = file.name
    const ext = filename.substr(filename.lastIndexOf('.') + 1)

    Object.defineProperty(file, 'accept', {
      value: ext === 'csv' ? true : false
    })

    files.push(file)
  }

  return files
}
