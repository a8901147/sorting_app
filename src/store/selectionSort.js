import { createSlice } from "@reduxjs/toolkit";
import BarStatus from "../function/barStatus";
import {
  initialBarArray,
  NUMBER_OF_ARRAY_BARS,
  totalCounter_bubble,
} from "../function/initial";

const initialSelectionSortState = {
  barArray: initialBarArray(NUMBER_OF_ARRAY_BARS),
  number_of_array_bars: NUMBER_OF_ARRAY_BARS,
  totalCounter: totalCounter_bubble(NUMBER_OF_ARRAY_BARS - 1),
  outerLoopCounter: 0,
  innerLoopCounter: 1,
  minIndex: 0,
};

const selectionSortSlice = createSlice({
  name: "bubbleSortReducer",
  initialState: initialSelectionSortState,
  reducers: {
    resetArray(state, action) {
      state.barArray = initialBarArray(action.payload.number_of_array_bars);
      state.number_of_array_bars = action.payload.number_of_array_bars;
      state.totalCounter = totalCounter_bubble(
        action.payload.number_of_array_bars - 1
      );
      state.outerLoopCounter = 0;
      state.innerLoopCounter = 1;
      state.minIndex = 0;
    },

    Selection_CheckAndUpdate(state) {
      if (state.innerLoopCounter - 1 !== state.outerLoopCounter) {
        state.barArray[state.innerLoopCounter - 1].status = BarStatus.WAITING;
      }

      state.barArray[state.innerLoopCounter].status = BarStatus.PROCESSING;
      if (
        state.barArray[state.minIndex].number >
        state.barArray[state.innerLoopCounter].number
      ) {
        state.minIndex = state.innerLoopCounter;
        state.barArray[state.outerLoopCounter].status = BarStatus.STOPING;
      } else {
        state.barArray[state.outerLoopCounter].status = BarStatus.PROCESSING;
      }
    },
    Selection_Swap(state) {
      if (
        state.barArray[state.outerLoopCounter].number >
          state.barArray[state.minIndex].number &&
        state.innerLoopCounter === state.number_of_array_bars - 1
      ) {
        [
          state.barArray[state.outerLoopCounter],
          state.barArray[state.minIndex],
        ] = [
          state.barArray[state.minIndex],
          state.barArray[state.outerLoopCounter],
        ];
        state.barArray[state.minIndex].status = BarStatus.WAITING;
        state.barArray[state.outerLoopCounter].status = BarStatus.WAITING;
      }
    },
    Selection_Finish(state) {
      if (state.innerLoopCounter === state.number_of_array_bars - 1) {
        state.outerLoopCounter++;
        state.innerLoopCounter = state.outerLoopCounter + 1;
        state.minIndex = state.outerLoopCounter;
        state.barArray[state.number_of_array_bars - 1].status =
          BarStatus.WAITING;
        state.barArray[state.outerLoopCounter - 1].status = BarStatus.FINISHING;
        if (state.outerLoopCounter === state.number_of_array_bars - 1) {
          state.barArray[state.outerLoopCounter].status = BarStatus.FINISHING;
        }
      } else {
        state.innerLoopCounter++;
      }
    },
  },
});

export const selectionSortActions = selectionSortSlice.actions;

export default selectionSortSlice.reducer;
