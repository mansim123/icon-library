import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the state types
type CheckoutState = {
  checkOutField: number;
  checkoutToggleField: string;
};

type InitialState = {
  value: CheckoutState;
};

// Define initial state
const initialState: InitialState = {
  value: {
    checkOutField: 0,
    checkoutToggleField: "right-[-25rem]",
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
    CheckoutToggle: (state) => {
      state.value.checkoutToggleField = state.value.checkoutToggleField === "right-[-25rem]" ? "right-[0rem]" : "right-[-25rem]";
    },
  },
});

// Export action creators
export const { CheckoutNumber, CheckoutToggle } = checkOutSlice.actions;

// Export the reducer
export default checkOutSlice.reducer;