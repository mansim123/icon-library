import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the state types
type CheckoutState = {
  checkOutField: number;
};

type InitialState = {
  value: CheckoutState;
};

// Define initial state
const initialState: InitialState = {
  value: {
    checkOutField: 0,
  },
};

// Create a slice
export const checkOutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    CheckoutNumber: (state, action: PayloadAction<number>) => {
      state.value.checkOutField = action.payload;
    },
  },
});

// Export action creators
export const { CheckoutNumber } = checkOutSlice.actions;

// Export the reducer
export default checkOutSlice.reducer;
