import { createSlice } from "@reduxjs/toolkit";
import { initialBarArray, NUMBER_OF_ARRAY_BARS } from "../function/initial";

const initialMergeSortState = {
  barArray: initialBarArray(NUMBER_OF_ARRAY_BARS),
  number_of_array_bars: NUMBER_OF_ARRAY_BARS,
};

function splitArray(array) {
  const arrayLength = array.length;
  if (arrayLength < 2) return array;

  const mid = Math.ceil(arrayLength / 2);
  console.log(arrayLength);
  console.log(mid);
  const arrayLeft = array.slice(0, mid);
  const arrayRight = array.slice(mid, arrayLength);
  const array_l = splitArray(arrayLeft);
  const array_r = splitArray(arrayRight);
  return mergeArray(array_l, array_r);
}

function mergeArray(arrayLeft, arrayRight) {
  const newArray = [];

  while (arrayLeft.length && arrayRight.length) {
    if (arrayLeft[0].number < arrayRight[0].number) {
      newArray.push(arrayLeft.shift());
    } else {
      newArray.push(arrayRight.shift());
    }
  }

  while (arrayLeft.length) {
    newArray.push(arrayLeft.shift());
  }

  while (arrayRight.length) {
    newArray.push(arrayRight.shift());
  }

  return newArray;
}

const mergeSortSlice = createSlice({
  name: "mergeSortReducer",
  initialState: initialMergeSortState,
  reducers: {
    resetArray(state, action) {
      state.barArray = initialBarArray(action.payload.number_of_array_bars);
      state.number_of_array_bars = action.payload.number_of_array_bars;
    },
    merge_sort(state) {
      state.barArray = splitArray(state.barArray);
    },
  },
});

export const mergeSortActions = mergeSortSlice.actions;

export default mergeSortSlice.reducer;
