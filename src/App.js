import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchBox from "./components/search-box/SearchBox";
import Table from "./components/Table/Table";
import Modal from "./components/Modal/Modal";

import {
  getCharacters,
  filterCharacters,
  sortFilterableCharacters,
  getPlanets,
} from "./features/global/globalSlice";

import "./App.css";

const App = () => {
  const [searchField, setSearchField] = useState("");

  const dispatch = useDispatch();
  const charactersAPIStatus = useSelector((state) => state.global.status);

  useEffect(() => {
    if (charactersAPIStatus === "idle") {
      dispatch(getCharacters());
      dispatch(getPlanets());
    }
  }, [charactersAPIStatus, dispatch]);

  const onSearchChange = (event) => {
    const searchFieldString = event.target.value.toLocaleLowerCase();
    setSearchField(searchFieldString);
  };

  // are these best practice for useSelectors?
  const filterableCharacters = useSelector((state) =>
    filterCharacters(state, searchField)
  );

  const sortableCharacters = useSelector((state) =>
    sortFilterableCharacters(state, filterableCharacters)
  );

  const showModal = useSelector((state) => state.global.isModalOpen);

  return (
    <div className="App">
      <h1>Star Wars Characters</h1>
      <SearchBox
        className="character-search-box"
        onSearchHandler={onSearchChange}
        placeholder="search characters"
      />
      <Table tableData={sortableCharacters} />
      {showModal ? <Modal /> : null}
    </div>
  );
};

export default App;
