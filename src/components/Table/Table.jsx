import TableBody from "../TableBody/TableBody";
import TableHead from "../TableHead/TableHead";

import "./Table.css";

// ultimately may be able to just use Context API rather than Redux
const Table = ({ tableData, setFilteredTableData }) => {
  const handleSorting = (sortField, sortOrder) => {
    console.log(sortField);
    if (sortField) {
      const sorted = [...tableData].sort((a, b) => {
        // if there are null values handle cases for sorting
        if (a[sortField] === null) return 1;
        if (b[sortField] === null) return -1;
        if (a[sortField] === null && b[sortField] === null) return 0;

        return (
          a[sortField].toString().localeCompare(b[sortField].toString(), "en", {
            numeric: true,
          }) * (sortOrder === "asc" ? 1 : -1)
        );
      });

      setFilteredTableData(sorted);
      console.log("sorted", sorted);
    }

    console.log(sortField, sortOrder);
  };

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
        <TableHead columns={columnData} handleSorting={handleSorting} />
        <TableBody columns={columnData} tableData={tableData} />
      </table>
    </>
  );
};

export default Table;
