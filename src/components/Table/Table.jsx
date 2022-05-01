import { useEffect, useState } from "react";
import TableBody from "../TableBody/TableBody";
import TableHead from "../TableHead/TableHead";

const Table = () => {
  // create columns for the Table
  // create or get data for table
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    // TODO: NEED TO GET HOMEWORLD DATA ALSO
    async function getData() {
      try {
        const characters = [];
        const response = await fetch("https://swapi.dev/api/people");
        const charactersData = await response.json();

        // TODO: too many calls will happen for every refresh
        // cache this somehow?
        for (const character of charactersData.results) {
          const homeWorldResponse = await fetch(character.homeworld);
          const homeWorldData = await homeWorldResponse.json();
          character.homeworld = homeWorldData.name;
          characters.push(character);
        }

        setTableData(characters);
      } catch (error) {
        console.log(`Error: ${error}`);
      }
    }

    getData();
  }, []);

  // WAIT? IS THIS NEEDED?
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
