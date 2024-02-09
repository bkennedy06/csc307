function TableHeader() {
  return (
      <thead>
          <tr>
              <th>ID</th> {/* Add ID header */}
              <th>Name</th>
              <th>Job</th>
              <th>Actions</th> {/* Optional: For clarity */}
          </tr>
      </thead>
  );
}

function TableBody(props) {
  const rows = props.characterData.map((row, index) => {
      return (
          <tr key={index}>
              <td>{row._id}</td> {/* Display ID */}
              <td>{row.name}</td>
              <td>{row.job}</td>
              <td>
                  <button onClick={() => props.removeCharacter(index)}>
                      Delete
                  </button>
              </td>
          </tr>
      );
  });
  return <tbody>{rows}</tbody>;
}

function Table(props) {
  return (
      <table>
          <TableHeader />
          <TableBody
              characterData={props.characterData}
              removeCharacter={props.removeCharacter}
          />
      </table>
  );
}

export default Table;
