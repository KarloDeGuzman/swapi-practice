import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchBox from "./components/search-box/SearchBox";
import Table from "./components/Table/Table";
import Modal from "./components/Modal/Modal";

import { getCharacters, getPlanets } from "./features/global/globalSlice";

import "./App.css";

const App = () => {
  const dispatch = useDispatch();
  const charactersAPIStatus = useSelector((state) => state.global.status);
  const showModal = useSelector((state) => state.global.isModalOpen);

  useEffect(() => {
    if (charactersAPIStatus === "idle") {
      dispatch(getCharacters());
      dispatch(getPlanets());
    }
  }, [charactersAPIStatus, dispatch]);

  return (
    <div className="App">
      <h1>Star Wars Characters</h1>
      <SearchBox />
      {charactersAPIStatus === "loading" ? <h2>Loading...</h2> : <Table />}
      {showModal ? <Modal /> : null}
    </div>
  );
};

export default App;
