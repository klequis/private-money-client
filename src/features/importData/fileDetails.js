export const fileData = ({ file }) => {
  if (file) {
    return (
      <div>
        <h2>File Details:</h2>

        <p>File Name: {file.name}</p>

        <p>File Type: {file.type}</p>
        <p>FileSize: {file.size}</p>

        <p>Last Modified: {file.lastModifiedDate.toDateString()}</p>
      </div>
    )
  } else {
    return (
      <div>
        <br />
        <h4>Choose before Pressing the Upload button</h4>
      </div>
    )
  }
}
