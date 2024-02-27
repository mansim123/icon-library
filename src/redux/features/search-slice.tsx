import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the state types
type SearchState = {
  searchField: string;
};

type InitialState = {
  value: SearchState;
};

// Define initial state
const initialState: InitialState = {
  value: {
    searchField: "",
  },
};

// Create a slice
export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    Searching: (state, action: PayloadAction<string>) => {
      state.value.searchField = action.payload;
    },
  },
});

// Export action creators
export const { Searching } = searchSlice.actions;

// Export the reducer
export default searchSlice.reducer;
