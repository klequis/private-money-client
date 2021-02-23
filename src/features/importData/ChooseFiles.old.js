import { useRef } from 'react'

export const ChooseFiles = ({ setFiles }) => {
  const _el = useRef()

  const _onFileChange = (e) => {
    const files = Array.from(e.target.files)
    setFiles(files)
  }

  return (
    <div className="file-upload">
      <input
        accept=".csv"
        type="file"
        ref={_el}
        onChange={_onFileChange}
        name="filesInput"
        multiple
      />
    </div>
  )
}
