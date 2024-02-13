import { configureStore } from "@reduxjs/toolkit"
import tabReducer from "./slice"

const store = configureStore({ reducer: { tab: tabReducer } })

export default store