import { configureStore } from "@reduxjs/toolkit";

import { authReducer } from "./Slices/auth";
import { basketReducer } from "./Slices/basket";

const store = configureStore({
  reducer: {
    auth: authReducer,
    basket: basketReducer,
  },
});

export default store;
