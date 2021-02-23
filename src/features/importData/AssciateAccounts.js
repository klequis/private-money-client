import styled from 'styled-components'
import { isNilOrEmpty } from 'lib/isNilOrEmpty'

const FileRowDiv = styled.div`
  diaplay: flex;
`
export const AssociateAccounts = ({ files }) => {
  return isNilOrEmpty(files) ? null : (
    <div>
      {files.map((f) => (
        <FileRowDiv>
          <div>{f.name}</div>
          <select />
        </FileRowDiv>
      ))}
    </div>
  )
}
