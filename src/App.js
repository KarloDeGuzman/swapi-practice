import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchBox from "./components/search-box/SearchBox";
import Table from "./components/Table/Table";
import Modal from "./components/Modal/Modal";

import {
  selectAllCharacters,
  getCharacters,
} from "./features/characters/charactersSlice";

import "./App.css";

function App() {
  // create or get data for table and/or filtered data
  // const [searchField, setSearchField] = useState("");
  // const [tableData, setTableData] = useState([]);
  // const [filteredTableData, setFilteredTableData] = useState(tableData);
  // const [planetsData, setPlanetsData] = useState([]);
  // const [singlePlanetData, setSinglePlanetData] = useState([]);
  // const [showModal, setShowModal] = useState(false);

  // const openModal = (fieldData) => {
  //   console.log(planetsData);
  //   console.log(fieldData);
  //   const filteredPlanet = planetsData.filter((data) => {
  //     return data.name
  //       .toLocaleLowerCase()
  //       .includes(fieldData.toLocaleLowerCase());
  //   });
  //   console.log(filteredPlanet);
  //   setSinglePlanetData(filteredPlanet);
  //   setShowModal(true);
  // };

  // // place useEffect here?
  // // ContextAPI definitely needed, datas are being passed from parent to child to child etc
  // useEffect(() => {
  //   const newFilteredTableData = tableData.filter((data) => {
  //     return data.name.toLocaleLowerCase().includes(searchField);
  //   });
  //   setFilteredTableData(newFilteredTableData);
  // }, [searchField, tableData]);

  const dispatch = useDispatch();
  const characters = useSelector(selectAllCharacters);
  const charactersAPIStatus = useSelector((state) => state.characters.status);
  console.log(charactersAPIStatus);
  useEffect(() => {
    if (charactersAPIStatus === "idle") {
      dispatch(getCharacters());
    }
  }, [charactersAPIStatus, dispatch]);

  // const onSearchChange = (event) => {
  //   const searchFieldString = event.target.value.toLocaleLowerCase();
  //   setSearchField(searchFieldString);
  // };

  console.log("characters redux: ", characters);

  return (
    <div className="App">
      <h1>Star Wars Characters</h1>
      {/* <SearchBox
        className="character-search-box"
        onSearchHandler={onSearchChange}
        placeholder="search characters"
      />
      <Table
        tableData={filteredTableData}
        setFilteredTableData={setFilteredTableData}
        openModal={openModal}
      />
      {showModal ? (
        <Modal
          setShowModal={setShowModal}
          singlePlanetData={singlePlanetData}
        />
      ) : null} */}
    </div>
  );
}

export default App;
