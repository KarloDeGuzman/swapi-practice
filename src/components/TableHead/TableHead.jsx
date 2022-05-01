import React from "react";

const TableHead = ({ columns }) => {
  return (
    <thead>
      <tr>
        {columns.map(({ label, field }) => {
          return <th key={field}>{label}</th>;
        })}
      </tr>
    </thead>
  );
};

export default TableHead;
