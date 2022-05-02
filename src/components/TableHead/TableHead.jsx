import React, { useState } from "react";

import "./TableHead.css";

const TableHead = ({ columns, handleSorting }) => {
  const [sortField, setSortField] = useState("");
  const [order, setOrder] = useState("asc");

  const handleSortingChange = (field) => {
    const sortOrder = field === sortField && order === "asc" ? "desc" : "asc";
    setSortField(field);
    setOrder(sortOrder);
    handleSorting(field, sortOrder);
  };
  return (
    <thead>
      <tr>
        {columns.map(({ label, field, sortable }) => {
          const cl = sortable
            ? sortField && sortField === field && order === "asc"
              ? "up"
              : sortField && sortField === field && order === "desc"
              ? "down"
              : ""
            : "";

          return (
            <th
              className={`table-head ${cl}`}
              key={field}
              onClick={sortable ? () => handleSortingChange(field) : null}
            >
              {label}
            </th>
          );
        })}
      </tr>
    </thead>
  );
};

export default TableHead;
