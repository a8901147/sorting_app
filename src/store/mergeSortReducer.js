import { createSlice } from "@reduxjs/toolkit";
import BarStatus from "../function/barStatus";
import { initialBarArray, NUMBER_OF_ARRAY_BARS } from "../function/initial";

const initialMergeSortState = {
  barArray: initialBarArray(NUMBER_OF_ARRAY_BARS),
  number_of_array_bars: NUMBER_OF_ARRAY_BARS,
};

const mergeSortSlice = createSlice({
  name: "mergeSortReducer",
  initialState: initialMergeSortState,
  reducers: {
    resetArray(state, action) {
      state.barArray = initialBarArray(action.payload.number_of_array_bars);
      state.number_of_array_bars = action.payload.number_of_array_bars;
    },
    merge_sort(state, action) {
      let arrayLeft_startPoint = action.payload.arrayLeft.startPoint;
      let arrayRight_startPoint = action.payload.arrayRight.startPoint;
      let arrayLeft_length = action.payload.arrayLeft.length;
      let arrayRight_length = action.payload.arrayRight.length;
      let currentIndex = arrayLeft_startPoint;

      while (arrayLeft_length > 0 && arrayRight_length > 0) {
        // 哪邊值比較小就加入進 result
        if (
          state.barArray[arrayLeft_startPoint].number <
          state.barArray[arrayRight_startPoint].number
        ) {
          let item1 = state.barArray[arrayLeft_startPoint];
          console.log("a");
          state.barArray.splice(arrayLeft_startPoint, 1);
          state.barArray.splice(currentIndex, 0, item1);
          arrayLeft_startPoint++;
          arrayLeft_length--;
        } else {
          let item2 = state.barArray[arrayRight_startPoint];
          console.log("b");
          state.barArray.splice(arrayRight_startPoint, 1);
          state.barArray.splice(currentIndex, 0, item2);
          arrayRight_startPoint++;
          arrayLeft_startPoint++;
          arrayRight_length--;
        }
        currentIndex++;
      }

      // 只剩左邊陣列就直接加入 result
      while (arrayLeft_length > 0) {
        let item3 = state.barArray[arrayLeft_startPoint];
        console.log("c");
        state.barArray.splice(arrayLeft_startPoint, 1);
        state.barArray.splice(currentIndex, 0, item3);
        arrayLeft_startPoint++;
        arrayLeft_length--;
        currentIndex++;
      }

      // 只剩右邊陣列就直接加入 result
      while (arrayRight_length > 0) {
        let item4 = state.barArray[arrayRight_startPoint];
        console.log("d");
        state.barArray.splice(arrayRight_startPoint, 1);
        state.barArray.splice(currentIndex, 0, item4);
        arrayRight_startPoint++;
        arrayLeft_startPoint++;
        arrayRight_length--;
        currentIndex++;
      }
    },
    merge_finish(state) {
      state.barArray.forEach((item) => {
        item.status = BarStatus.FINISHING;
      });
    },
  },
});

export const mergeSortActions = mergeSortSlice.actions;

export default mergeSortSlice.reducer;
