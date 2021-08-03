import { createSlice } from "@reduxjs/toolkit";
import BarStatus from "../function/barStatus";
import {
  initialBarArray,
  NUMBER_OF_ARRAY_BARS,
  totalCounter_bubble,
} from "../function/initial";

const initialBubbleSortState = {
  barArray: initialBarArray(NUMBER_OF_ARRAY_BARS),
  number_of_array_bars: NUMBER_OF_ARRAY_BARS,
  totalCounter: totalCounter_bubble(NUMBER_OF_ARRAY_BARS - 1),
  outerLoopCounter: 0,
  innerLoopCounter: NUMBER_OF_ARRAY_BARS - 2,
};

const bubbleSortSlice = createSlice({
  name: "bubbleSortReducer",
  initialState: initialBubbleSortState,
  reducers: {
    resetArray(state, action) {
      state.barArray = initialBarArray(action.payload.number_of_array_bars);
      state.number_of_array_bars = action.payload.number_of_array_bars;
      state.totalCounter = totalCounter_bubble(
        action.payload.number_of_array_bars - 1
      );
      state.outerLoopCounter = 0;
      state.innerLoopCounter = action.payload.number_of_array_bars - 2;
    },

    bubble_Check(state, action) {
      if (
        state.barArray[state.outerLoopCounter].number <
        state.barArray[state.outerLoopCounter + 1].number
      ) {
        state.barArray[state.outerLoopCounter].status = BarStatus.PROCESSING;
        state.barArray[state.outerLoopCounter + 1].status =
          BarStatus.PROCESSING;
      } else {
        state.barArray[state.outerLoopCounter].status = BarStatus.STOPING;
        state.barArray[state.outerLoopCounter + 1].status = BarStatus.STOPING;
      }
    },
    bubble_Swap(state) {
      if (
        state.barArray[state.outerLoopCounter].number >
        state.barArray[state.outerLoopCounter + 1].number
      ) {
        [
          state.barArray[state.outerLoopCounter],
          state.barArray[state.outerLoopCounter + 1],
        ] = [
          state.barArray[state.outerLoopCounter + 1],
          state.barArray[state.outerLoopCounter],
        ];
      }
    },
    bubble_Finish(state) {
      if (state.outerLoopCounter === 0 && state.innerLoopCounter === 0) {
        state.barArray[state.outerLoopCounter].status = BarStatus.FINISHING;
        state.barArray[state.outerLoopCounter + 1].status = BarStatus.FINISHING;
      } else {
        state.barArray[state.outerLoopCounter].status = BarStatus.WAITING;
        state.barArray[state.outerLoopCounter + 1].status = BarStatus.WAITING;
      }

      if (state.outerLoopCounter === state.innerLoopCounter) {
        state.barArray[state.outerLoopCounter + 1].status = BarStatus.FINISHING;
        state.innerLoopCounter--;
        state.outerLoopCounter = 0;
      } else {
        state.outerLoopCounter++;
      }
    },
  },
});

export const bubbleSortActions = bubbleSortSlice.actions;

export default bubbleSortSlice.reducer;
