import { createSlice } from "@reduxjs/toolkit";
import SortingType from "../function/sortingType";
import Status from "../function/status";

// Change this value for the number of bars (value) in the array.
function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min) + min);
}

function randomArray(number) {
  const array = [];
  for (let i = 0; i < number; i++) {
    array.push(randomIntFromInterval(1, 701));
  }
  return array;
}

const initialArrayState = {
  barArray: [],
  number_of_array_bars: 50,
  sortType: SortingType.BUBBLE_SORT,
  sortingCounter: -1,
  finishedCounter: 0,
  delay: 1,
};

const arraySlice = createSlice({
  name: "Array",
  initialState: initialArrayState,
  reducers: {
    resetArray(state, action) {
      state.barArray = [];
      state.delay = action.payload.delay;
      state.number_of_array_bars = action.payload.number_of_array_bars;
      state.finishedCounter = state.number_of_array_bars - 1;
      state.sortType = action.payload.sortType;
      state.sortingCounter = -1;
      const newArray = randomArray(state.number_of_array_bars);

      for (var i = 0; i < newArray.length; i++) {
        state.barArray.push({
          id: i,
          number: newArray[i],
          status: Status.WAITING,
        });
      }
    },
    resetSortType(state, action) {
      state.sortType = action.payload;
    },
    sortArray(state, action) {
      if (state.sortType === SortingType.BUBBLE_SORT) {
        state.sortingCounter++;
        if (state.sortingCounter !== 0) {
          state.barArray[state.sortingCounter - 1].status =
            state.barArray[state.sortingCounter - 1].status === Status.FINISHING
              ? Status.FINISHING
              : Status.WAITING;
        }
        state.barArray[state.sortingCounter].status =
          state.barArray[state.sortingCounter].status === Status.FINISHING
            ? Status.FINISHING
            : Status.PROCESSING;
        state.barArray[state.sortingCounter + 1].status =
          state.barArray[state.sortingCounter + 1].status === Status.FINISHING
            ? Status.FINISHING
            : Status.PROCESSING;

        console.log("**sortArray**");
      } else if (state.sortType === SortingType.SELECTION_SORT) {
        //TODO:
      } else if (state.sortType === SortingType.MERGE_SORT) {
        //TODO:
      }
    },
    stop(state) {
      if (
        state.sortType === SortingType.BUBBLE_SORT &&
        state.sortingCounter !== -1
      ) {
        if (
          state.barArray[state.sortingCounter].number >
          state.barArray[state.sortingCounter + 1].number
        ) {
          state.barArray[state.sortingCounter].status =
            state.barArray[state.sortingCounter].status === Status.FINISHING
              ? Status.FINISHING
              : Status.STOPING;
          state.barArray[state.sortingCounter + 1].status =
            state.barArray[state.sortingCounter + 1].status === Status.FINISHING
              ? Status.FINISHING
              : Status.STOPING;
          console.log("**stop**");
        }
      }
    },
    swap(state, action) {
      if (
        state.sortType === SortingType.BUBBLE_SORT &&
        state.sortingCounter !== -1
      ) {
        if (
          state.barArray[state.sortingCounter].number >
          state.barArray[state.sortingCounter + 1].number
        ) {
          [
            state.barArray[state.sortingCounter],
            state.barArray[state.sortingCounter + 1],
          ] = [
            state.barArray[state.sortingCounter + 1],
            state.barArray[state.sortingCounter],
          ];
          console.log("**swap**");
        }
      }
    },
    goNext(state) {
      if (
        state.sortType === SortingType.BUBBLE_SORT &&
        state.sortingCounter !== -1
      ) {
        if (
          state.barArray[state.sortingCounter].number <
          state.barArray[state.sortingCounter + 1].number
        ) {
          state.barArray[state.sortingCounter].status =
            state.barArray[state.sortingCounter].status === Status.FINISHING
              ? Status.FINISHING
              : Status.PROCESSING;
          state.barArray[state.sortingCounter + 1].status =
            state.barArray[state.sortingCounter + 1].status === Status.FINISHING
              ? Status.FINISHING
              : Status.PROCESSING;
        }
        if (
          state.sortingCounter === state.barArray.length - 2 &&
          state.finishedCounter >= 0
        ) {
          state.barArray[state.finishedCounter].status = Status.FINISHING;
          // detail
          if (state.finishedCounter === state.number_of_array_bars - 1) {
            state.barArray[state.finishedCounter - 1].status = Status.WAITING;
          }
          state.finishedCounter--;
          state.sortingCounter = -1;
          console.log("**goNext**");
        }
      }
    },
  },
});

export const arrayActions = arraySlice.actions;

export default arraySlice.reducer;
