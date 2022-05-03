import { useSelector, useDispatch } from "react-redux";
import { updateSort } from "../../features/global/globalSlice";

import "./TableHead.css";

const TableHead = ({ columns }) => {
  const dispatch = useDispatch();

  const order = useSelector((state) => state.global.sortOrder);
  const sortField = useSelector((state) => state.global.sortKey);

  const handleSortingChange = (field) => {
    const sortOrder = field === sortField && order === "asc" ? "desc" : "asc";
    dispatch(updateSort({ sortKey: field, sortOrder }));
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
