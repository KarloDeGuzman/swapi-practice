import TableBody from "../TableBody/TableBody";
import TableHead from "../TableHead/TableHead";

import "./Table.css";
// ultimately may be able to just use Context API rather than Redux
const Table = ({ tableData }) => {
  // WAIT? IS THIS NEEDED?
  // possible not to be hard coded?
  // create columns for the Table
  const columnData = [
    {
      label: "Name",
      field: "name",
      sortable: true,
    },
    {
      label: "Height",
      field: "height",
      sortable: true,
    },
    {
      label: "Mass",
      field: "mass",
      sortable: true,
    },
    {
      label: "Created",
      field: "created",
      sortable: true,
    },
    {
      label: "Edited",
      field: "edited",
      sortable: true,
    },
    {
      label: "Planet Name",
      field: "homeworld",
      sortable: true,
    },
  ];

  return (
    <>
      <table className="table">
        <TableHead columns={columnData} />
        <TableBody columns={columnData} tableData={tableData} />
      </table>
    </>
  );
};

export default Table;
