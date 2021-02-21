export const ResultTable = ({ file }) => {
  const { mtime, name, path, size, type } = file

  return (
    <div>
      <hr />
      <table>
        <thead>
          <tr>
            <th>key</th>
            <th>value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>name</td>
            <td>{name}</td>
          </tr>
          <tr>
            <td>mtime</td>
            <td>{mtime}</td>
          </tr>
          <tr>
            <td>path</td>
            <td>{path}</td>
          </tr>
          <tr>
            <td>size</td>
            <td>{size}</td>
          </tr>
          <tr>
            <td>type</td>
            <td>{type}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
