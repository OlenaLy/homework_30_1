import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Запит всіх персонажів
export const fetchSwapiData = createAsyncThunk(
  "swapi/fetchData",
  async () => {
    const response = await fetch("https://swapi.py4e.com/api/people/");
    const data = await response.json();
    return data.results;
  }
);

// Запит конкретного персонажа по id
export const fetchSwapiPerson = createAsyncThunk(
  "swapi/fetchPerson",
  async (id) => {
    const response = await fetch(`https://swapi.py4e.com/api/people/${id}/`);
    if (!response.ok) {
      throw new Error("Person not found");
    }
    return await response.json();
  }
);

const swapiSlice = createSlice({
  name: "swapi",
  initialState: {
    data: [],
    person: null,   // ← для одного персонажа
    isLoading: false,
    error: null,
  },
  reducers: {
    clearData: (state) => {
      state.data = [];
      state.person = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // для fetchSwapiData
      .addCase(fetchSwapiData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchSwapiData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchSwapiData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

      // для fetchSwapiPerson
      .addCase(fetchSwapiPerson.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchSwapiPerson.fulfilled, (state, action) => {
        state.isLoading = false;
        state.person = action.payload;
      })
      .addCase(fetchSwapiPerson.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const { clearData } = swapiSlice.actions;
export default swapiSlice.reducer;
