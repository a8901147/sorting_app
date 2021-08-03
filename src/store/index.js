import { configureStore } from "@reduxjs/toolkit";
import bubbleSortReducer from "./bubbleSortReducer";
import selectionSortReducer from "./selectionSort";
import basic from "./basic";

const store = configureStore({
  reducer: {
    bubble: bubbleSortReducer,
    basic: basic,
    select: selectionSortReducer,
  },
});

export default store;
