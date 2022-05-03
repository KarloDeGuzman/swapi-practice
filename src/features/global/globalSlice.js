import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  characters: [],
  planets: [],
  status: "idle",
  error: null,
  sortKey: "",
  sortOrder: "asc",
  isModalOpen: false,
  planetName: "",
};

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
  }
);

// find a way to not repeat here
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
  }
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

//TODO: memoize these calls
export const selectAllCharacters = (state) => state.global.characters;

export const selectAllPlanets = (state) => state.global.planets;

export const filterCharacters = (state, searchField) => {
  const allCharacters = state.global.characters;

  if (searchField === "") {
    return allCharacters;
  } else {
    return allCharacters.filter((character) => {
      return character.name.toLocaleLowerCase().includes(searchField);
    });
  }
};

export const sortFilterableCharacters = (state, filteredCharacters) => {
  if (filteredCharacters.length === 0) return state.global.characters;

  if (state.global.sortKey) {
    const sortedCharacters = [...filteredCharacters].sort((a, b) => {
      // if there are null values handle cases for sorting
      if (a[state.global.sortKey] === null) return 1;
      if (b[state.global.sortKey] === null) return -1;
      if (
        a[state.global.sortKey] === null &&
        b[state.global.sortKey] === null
      ) {
        return 0;
      }

      return (
        a[state.global.sortKey]
          .toString()
          .localeCompare(b[state.global.sortKey].toString(), "en", {
            numeric: true,
          }) * (state.global.sortOrder === "asc" ? 1 : -1)
      );
    });

    return sortedCharacters;
  }

  return filteredCharacters;
};

export const getPlanetDetails = (state) => {
  const planets = state.global.planets;

  return planets.filter((planet) => planet.name === state.global.planetName);
};

export const { reset, updateSort, updateModal, updatePlanetName } =
  globalSlice.actions;
export default globalSlice.reducer;
