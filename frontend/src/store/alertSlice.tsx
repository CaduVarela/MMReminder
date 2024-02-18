import { createSlice } from "@reduxjs/toolkit";

export interface AlertType {
  alert?: {
    alert?: {
      text?: string,
      severity?: "success" | "warning" | "error" | "info",
      autoHideDuration?: number
    }
  }
}

const initialState = {
  alert: {
    text: "",
    severity: "success",
    autoHideDuration: 0
  }
} as AlertType

export const slice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    setAlert: (state, action) => {
      const newValue = action.payload
      state.alert = newValue
    },
    resetAlert: (state) => {
      state.alert = initialState.alert
    }
  }
})

export const { setAlert, resetAlert } = slice.actions

export default slice.reducer