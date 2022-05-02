import React from "react";

import "./TableHead.css";

const TableHead = ({ columns }) => {
  return (
    <thead>
      <tr>
        {columns.map(({ label, field }) => {
          return (
            <th className="table-head" key={field}>
              {label}
            </th>
          );
        })}
      </tr>
    </thead>
  );
};

export default TableHead;
