import { configureStore } from "@reduxjs/toolkit"
import tabReducer from "./tabSlice"
import alertReducer from "./alertSlice"

const store = configureStore({
  reducer: {
    tab: tabReducer,
    alert: alertReducer
  }
})

export default store