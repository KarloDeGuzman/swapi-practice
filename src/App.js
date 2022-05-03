import { useState, useEffect } from 'react';
import './App.css';
import SearchBox from './components/search-box/SearchBox';
import Table from './components/Table/Table';
import Modal from './components/Modal/Modal';

function App() {
  // create or get data for table and/or filtered data
  const [searchField, setSearchField] = useState('');
  const [tableData, setTableData] = useState([]);
  const [filteredTableData, setFilteredTableData] = useState(tableData);
  const [planetsData, setPlanetsData] = useState([]);
  const [singlePlanetData, setSinglePlanetData] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const openModal = (fieldData) => {
    console.log(planetsData);
    console.log(fieldData);
    const filteredPlanet = planetsData.filter((data) => {
      return data.name
        .toLocaleLowerCase()
        .includes(fieldData.toLocaleLowerCase());
    });
    console.log(filteredPlanet);
    setSinglePlanetData(filteredPlanet);
    setShowModal(true);
  };

  // place useEffect here?
  // ContextAPI definitely needed, datas are being passed from parent to child to child etc
  useEffect(() => {
    const newFilteredTableData = tableData.filter((data) => {
      return data.name.toLocaleLowerCase().includes(searchField);
    });
    setFilteredTableData(newFilteredTableData);
  }, [searchField, tableData]);

  useEffect(() => {
    async function getData() {
      try {
        const characters = [];
        const planets = [];
        const response = await fetch('https://swapi.dev/api/people');
        const charactersData = await response.json();

        // TODO: too many calls will happen for every refresh
        // cache this somehow?
        // cache character data?
        for (const character of charactersData.results) {
          const homeWorldResponse = await fetch(character.homeworld);
          const homeWorldData = await homeWorldResponse.json();
          character.homeworld = homeWorldData.name;

          let homeworldObject = {
            name: homeWorldData.name,
            diameter: homeWorldData.diameter,
            climate: homeWorldData.climate,
            population: homeWorldData.population,
          };

          //try to find unique planet objects instead of pushing duplicate planets
          let found = planets.some((planet) => {
            return planet.name === homeWorldData.name;
          });

          if (!found) {
            planets.push(homeworldObject);
          }

          characters.push(character);
        }

        setTableData(characters);
        setPlanetsData(planets);
        console.log('planets:', planets);
        console.log(characters);
      } catch (error) {
        console.log(`Error: ${error}`);
      }
    }

    getData();
  }, []);

  const onSearchChange = (event) => {
    const searchFieldString = event.target.value.toLocaleLowerCase();
    setSearchField(searchFieldString);
  };

  return (
    <div className="App">
      <h1>Star Wars Characters</h1>
      <SearchBox
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
      ) : null}
    </div>
  );
}

export default App;
