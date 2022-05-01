import React from "react";

const TableBody = ({ columns, tableData }) => {
  return (
    <tbody>
      {tableData.map((data) => {
        return (
          <tr key={data.name}>
            {columns.map(({ field }) => {
              const tData = data[field] ? data[field] : "----";
              return <td key={field}>{tData}</td>;
            })}
          </tr>
        );
      })}
    </tbody>
  );
};

export default TableBody;
