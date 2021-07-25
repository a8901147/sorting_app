import { configureStore } from "@reduxjs/toolkit";
import arrayReducer from "./array";

const store = configureStore({
  reducer: { array: arrayReducer },
});

export default store;
