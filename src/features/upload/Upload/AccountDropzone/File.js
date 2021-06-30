import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { getFileBaseName } from 'lib/getFileBaseName'
import { Circle } from 'svg/Circle'
import { CircleCheck } from 'svg/CircleCheck'
import { CircleX } from 'svg/CircleX'
import { FileEarmarkText } from 'svg/FileEarmarkText'
import * as R from 'ramda'
/* eslint-disable */
import { green, yellow, red, purple } from 'logger'
/* eslint-enable */

const Row = styled.div`
  display: flex;
  ${'' /* align-items: center; */}
  ${'' /* justify-content: space-between; */}
  flex-direction: column;
  align-items: stretch;
  border-top: 1px solid white;

  /* border-bottom needs to be last child */

  border-bottom: 1px solid white;
  padding: 5px 0;
`

const FileContainerDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 5px;
  width: 100%;
`

const FileName = styled.div`
  display: flex;
  min-width: 0;
  align-items: center;
`

const FileNameBase = styled.span`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  padding: 0 0 1px 5px;
`

const FileNameExtension = styled.span`
  flex-shrink: 0;
  padding: 0 0 1px 0;
`

const Progress = ({ file, progress }) => {
  const { filename, progressNum } = progress
  // is there a progress for this file?
  // const a = progress[filename]

  // If progress is not for this file ignore / return
  if (file.name !== filename) return 'hi'
  if (progressNum === 0) return <Circle />
  if (progressNum === 100) return <CircleCheck />
  if (progressNum > 0 && progress < 100) return <span>{progress}</span>
  return <span>E</span>
}

const FileAccepted = ({ file, progress }) => {
  const { name, extension } = file
  const baseFilename = getFileBaseName(name)

  return (
    <Row>
      <FileContainerDiv id="Container">
        <FileName id="FileName">
          <FileEarmarkText />
          <FileNameBase id="FileNameBase">{baseFilename}</FileNameBase>
          <FileNameExtension id="FileNameExtension">
            .{extension}
          </FileNameExtension>
        </FileName>
        <Progress file={file} progress={progress} />
      </FileContainerDiv>
    </Row>
  )
}

const RejectMsgSpan = styled.span`
  padding-left: 21px;
  color: red;
  padding: 0 5px;
`

const RejectMessage = ({ file }) => {
  const { duplicate, hasCSVExtension } = file
  if (!hasCSVExtension) {
    return 'File must have a .csv extension'
  } else if (duplicate) {
    return 'Duplicate file.'
  } else {
    return 'Unknown file error.'
  }
}

const FileRejected = ({ file }) => {
  const { name, extension } = file
  const baseFileName = getFileBaseName(name)
  return (
    <Row>
      <FileContainerDiv id="Container">
        <FileName id="FileName">
          <FileNameBase id="FileNameBase">{baseFileName}</FileNameBase>
          <FileNameExtension id="FileNameExtension">
            .{extension}
          </FileNameExtension>
        </FileName>
        <CircleX />
      </FileContainerDiv>
      <RejectMsgSpan>
        <em>
          <RejectMessage file={file} />
        </em>
      </RejectMsgSpan>
    </Row>
  )
}

export const File = ({ file, progress }) => {
  const { accepted } = file
  const [_progress, _setProgress] = useState({})

  useEffect(() => {
    const { filename, progressNum } = progress
    if (filename !== undefined && progressNum !== undefined)
      _setProgress(R.merge(_progress, { filename, progressNum }))
    // eslint-disable-next-line
  }, [progress])

  return accepted ? (
    <FileAccepted file={file} progress={_progress} />
  ) : (
    <FileRejected file={file} />
  )
}
