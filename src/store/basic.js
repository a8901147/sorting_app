import { createSlice } from "@reduxjs/toolkit";
import SortingType from "../function/sortingType";

const initialBasicState = {
  sortType: SortingType.BUBBLE_SORT,
};

const basicSlice = createSlice({
  name: "Basic",
  initialState: initialBasicState,
  reducers: {
    resetSortType(state, action) {
      state.sortType = action.payload;
    },
  },
});

export const basicActions = basicSlice.actions;

export default basicSlice.reducer;
