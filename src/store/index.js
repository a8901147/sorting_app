import { configureStore } from "@reduxjs/toolkit";
import bubbleSortReducer from "./bubbleSortReducer";
import selectionSortReducer from "./selectionSortReducer";
import mergeSortReducer from "./mergeSortReducer";
import basic from "./basic";

const store = configureStore({
  reducer: {
    bubble: bubbleSortReducer,
    basic: basic,
    select: selectionSortReducer,
    merge: mergeSortReducer,
  },
});

export default store;
