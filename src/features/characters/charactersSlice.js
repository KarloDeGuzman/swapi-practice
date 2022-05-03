import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  characters: [],
  planets: [],
  status: "idle",
  error: null,
};

export const getCharacters = createAsyncThunk(
  "characters/getCharacters",
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

export const charactersSlice = createSlice({
  name: "characters",
  initialState,
  reducers: {
    reset: (state) => {
      state.error = null;
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
      });
  },
});

export const selectAllCharacters = (state) => state.characters;

export const { reset } = charactersSlice.actions;
export default charactersSlice.reducer;
