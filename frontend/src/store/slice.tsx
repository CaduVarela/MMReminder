import { createSlice } from "@reduxjs/toolkit";

export interface stateType {
  tab: {
    tab?: string
  }
}

const initialState = {
  tab: "teams"
} as stateType

export const slice = createSlice({
  name: "tab",
  initialState,
  reducers: {
    changeTab: (state, action) => {
      const newTab = action.payload
      state.tab = newTab
    }
  }
})

export const { changeTab } = slice.actions

export default slice.reducer