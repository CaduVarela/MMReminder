import { createSlice } from "@reduxjs/toolkit";

export interface TabType {
  tab: {
    tab?: string
  }
}

const initialState = {
  tab: "teams"
} as TabType

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