import './TableBody.css';

const TableBody = ({ columns, tableData, openModal }) => {
  return (
    <tbody>
      {tableData.map((data) => {
        return (
          <tr key={data.name}>
            {columns.map(({ field }) => {
              const tData = data[field] ? data[field] : '----';
              if (field.toUpperCase() === 'HOMEWORLD') {
                return (
                  <td
                    className="td-body"
                    key={field}
                    onClick={() => openModal(tData)}
                  >
                    {tData}
                  </td>
                );
              } else {
                return (
                  <td className="td-body" key={field}>
                    {tData}
                  </td>
                );
              }
            })}
          </tr>
        );
      })}
    </tbody>
  );
};

export default TableBody;
