import {configureStore} from "@reduxjs/toolkit";
import searchSlice from "./features/search-slice";
import checkOutSlice from "./features/checkout-slice"
import { TypedUseSelectorHook, useSelector } from "react-redux";

export const store = configureStore ({

    reducer: {
        searchSlice,
        checkOutSlice
    },

})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;