import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from "@reduxjs/toolkit";

// if caching, check for localStorage to fill up characters, planets etc
// else continue with api call
const initialState = {
  characters: [],
  planets: [],
  status: "idle",
  error: null,
  sortKey: "",
  sortOrder: "asc",
  isModalOpen: false,
  planetName: "",
  searchField: "",
};

// implement some sort of caching?
// IDEA: adding to localStorage and search for localstorage first
// if doesn't exist continue with api call
export const getCharacters = createAsyncThunk(
  "global/getCharacters",
  async (_, thunkAPI) => {
    const characters = [];

    try {
      const response = await fetch("https://swapi.dev/api/people");
      const charactersData = await response.json();

      for (const character of charactersData.results) {
        const homeWorldResponse = await fetch(character.homeworld);
        const homeWorldData = await homeWorldResponse.json();
        character.homeworld = homeWorldData.name;
        characters.push(character);
      }

      return characters;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const getPlanets = createAsyncThunk(
  "global/getPlanets",
  async (_, thunkAPI) => {
    const planets = [];

    try {
      const response = await fetch("https://swapi.dev/api/people");
      const charactersData = await response.json();

      for (const character of charactersData.results) {
        const homeWorldResponse = await fetch(character.homeworld);
        const homeWorldData = await homeWorldResponse.json();

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
      }

      return planets;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    reset: (state) => {
      state.error = null;
    },
    updateSort: (state, action) => {
      const { sortKey, sortOrder } = action.payload;

      state.sortKey = sortKey;
      state.sortOrder = sortOrder;
    },
    updateModal: (state, action) => {
      state.isModalOpen = action.payload;
    },
    updatePlanetName: (state, action) => {
      state.planetName = action.payload;
    },
    updateSearchField: (state, action) => {
      state.searchField = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getCharacters.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getCharacters.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.characters = action.payload;
      })
      .addCase(getCharacters.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(getPlanets.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.planets = action.payload;
      });
  },
});

/* SELECTOR FUNCTIONS*/
export const selectAllCharacters = (state) => state.global.characters;
export const selectAllPlanets = (state) => state.global.planets;
export const selectSortKey = (state) => state.global.sortKey;
export const selectSortOrder = (state) => state.global.sortOrder;

// OLD filterCharacters
// export const filterCharacters = (state, searchField) => {
//   const allCharacters = state.global.characters;

//   if (searchField === "") {
//     return allCharacters;
//   } else {
//     return allCharacters.filter((character) => {
//       return character.name.toLocaleLowerCase().includes(searchField);
//     });
//   }
// };

// NEW memoized selector filterCharacters
export const selectFilteredCharcters = createSelector(
  [selectAllCharacters, (state) => state.global.searchField],
  (allCharacters, searchField) => {
    if (searchField === "") {
      return allCharacters;
    } else {
      return allCharacters.filter((character) => {
        return character.name.toLocaleLowerCase().includes(searchField);
      });
    }
  },
);

// OLD sortFilterableCharacters
// export const sortFilterableCharacters = (state, filteredCharacters) => {
//   if (filteredCharacters.length === 0) return state.global.characters;

//   if (state.global.sortKey) {
//     const sortedCharacters = [...filteredCharacters].sort((a, b) => {
//       // if there are null values handle cases for sorting
//       if (a[state.global.sortKey] === null) return 1;
//       if (b[state.global.sortKey] === null) return -1;
//       if (
//         a[state.global.sortKey] === null &&
//         b[state.global.sortKey] === null
//       ) {
//         return 0;
//       }

//       // able to sort strings, dates, numbers without creating sorting methods for each column
//       return (
//         a[state.global.sortKey]
//           .toString()
//           .localeCompare(b[state.global.sortKey].toString(), "en", {
//             numeric: true,
//           }) * (state.global.sortOrder === "asc" ? 1 : -1)
//       );
//     });

//     return sortedCharacters;
//   }

//   return filteredCharacters;
// };

// NEW memoized selector sortFilterableCharacters
export const selectSortedAndFilterableCharacters = createSelector(
  [
    selectAllCharacters,
    selectFilteredCharcters,
    selectSortKey,
    selectSortOrder,
  ],
  (allCharacters, filteredCharacters, sortKey, sortOrder) => {
    if (filteredCharacters.length === 0) return [...allCharacters];

    if (sortKey) {
      const sortedCharacters = [...filteredCharacters].sort((a, b) => {
        // if there are null values handle cases for sorting
        if (a[sortKey] === null) return 1;
        if (b[sortKey] === null) return -1;
        if (a[sortKey] === null && b[sortKey] === null) {
          return 0;
        }

        // able to sort strings, dates, numbers without creating sorting methods for each column
        return (
          a[sortKey].toString().localeCompare(b[sortKey].toString(), "en", {
            numeric: true,
          }) * (sortOrder === "asc" ? 1 : -1)
        );
      });

      return sortedCharacters;
    }

    return [...filteredCharacters];
  },
);

// OLD getPlanetDetails
// export const getPlanetDetails = (state) => {
//   const planets = state.global.planets;

//   return planets.filter((planet) => planet.name === state.global.planetName);
// };

// NEW getPlanetDetails
// memomizing previous set of inputs and the calculated result
export const getPlanetDetails = createSelector(
  [selectAllPlanets, (state) => state.global.planetName],
  (planets, planetName) =>
    planets.filter(
      (planet) =>
        planet.name.toLocaleLowerCase() === planetName.toLocaleLowerCase(),
    ),
);

export const {
  reset,
  updateSort,
  updateModal,
  updatePlanetName,
  updateSearchField,
} = globalSlice.actions;

export default globalSlice.reducer;
