import { createSlice } from "@reduxjs/toolkit";
import SortingType from "../function/sortingType";

const initialSortingState = {
  sortType: "",
};

const sortingSlice = createSlice({
  name: "Sorting",
  initialState: initialSortingState,
  reducers: {
    resetSortType(state, action) {
      state.sortType = action.payload;
    },
    sortArray(state, action) {
      if (state.sortType === SortingType.BUBBLE_SORT) {
      } else if (state.sortType === SortingType.SELECTION_SORT) {
        //TODO:
      } else if (state.sortType === SortingType.MERGE_SORT) {
        //TODO:
      }
    },
  },
});

export const sortingActions = sortingSlice.actions;

export default sortingSlice.reducer;
